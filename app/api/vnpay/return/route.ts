import { NextResponse } from "next/server";
import crypto from "crypto";
import qs from "qs";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmationEmail } from "@/lib/mailer";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    
    const vnp_Params: any = {};
    for (const [key, value] of searchParams.entries()) {
      vnp_Params[key] = value;
    }

    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    // Sort keys alphabetically
    const sortedParams = sortObject(vnp_Params);
    const secretKey = process.env.VNP_HASH_SECRET;
    
    if (!secretKey) {
      return NextResponse.redirect(new URL('/checkout/cancel?error=config', req.url));
    }

    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
      const orderId = vnp_Params['vnp_TxnRef'];
      const responseCode = vnp_Params['vnp_ResponseCode'];
      const transactionNo = vnp_Params['vnp_TransactionNo'];

      if (responseCode === '00') {
        // Payment success
        const updatedBooking = await prisma.booking.update({
          where: { id: orderId },
          data: {
            status: "Hoàn tất",
            paymentStatus: "Đã thanh toán",
            transactionId: transactionNo
          },
          include: {
            tour: true,
            hotel: true,
            customer: true
          }
        });

        // Gửi email xác nhận thanh toán (Vé điện tử)
        if (updatedBooking && updatedBooking.customer?.email) {
           await sendBookingConfirmationEmail(updatedBooking, updatedBooking.customer.email);
        }
        
        return NextResponse.redirect(new URL(`/checkout/success?orderId=${orderId}`, req.url));
      } else {
        // Payment failed or canceled
        await prisma.booking.update({
          where: { id: orderId },
          data: {
            paymentStatus: "Thất bại"
          }
        });
        return NextResponse.redirect(new URL(`/checkout/cancel?orderId=${orderId}&code=${responseCode}`, req.url));
      }
    } else {
      return NextResponse.redirect(new URL('/checkout/cancel?error=checksum', req.url));
    }

  } catch (error) {
    console.error("VNPay Return error:", error);
    return NextResponse.redirect(new URL('/checkout/cancel?error=exception', req.url));
  }
}

function sortObject(obj: any) {
  const sorted: any = {};
  const str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
