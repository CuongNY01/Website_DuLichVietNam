import { NextResponse } from "next/server";
import crypto from "crypto";
import qs from "qs";
import moment from "moment";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { bookingId, amount, bankCode, language = 'vn' } = await req.json();

    if (!bookingId || !amount) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
    }

    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_HASH_SECRET;
    let vnpUrl = process.env.VNP_URL;
    const returnUrl = process.env.VNP_RETURN_URL;

    if (!tmnCode || !secretKey || !vnpUrl || !returnUrl) {
      return NextResponse.json({ error: "Lỗi cấu hình hệ thống thanh toán" }, { status: 500 });
    }

    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');
    const orderId = bookingId; // Use our internal booking ID
    
    // Check if booking exists
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 });
    }

    const ipAddr = req.headers.get('x-forwarded-for') || "127.0.0.1";

    const vnp_Params: any = {
      'vnp_Version': '2.1.0',
      'vnp_Command': 'pay',
      'vnp_TmnCode': tmnCode,
      'vnp_Locale': language,
      'vnp_CurrCode': 'VND',
      'vnp_TxnRef': orderId,
      'vnp_OrderInfo': `Thanh toan don hang ${orderId}`,
      'vnp_OrderType': 'other',
      'vnp_Amount': amount * 100, // Amount must be multiplied by 100
      'vnp_ReturnUrl': returnUrl,
      'vnp_IpAddr': ipAddr,
      'vnp_CreateDate': createDate
    };

    if (bankCode) {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    // Sort keys alphabetically
    const sortedParams = sortObject(vnp_Params);
    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    sortedParams['vnp_SecureHash'] = signed;
    vnpUrl += '?' + qs.stringify(sortedParams, { encode: false });

    return NextResponse.json({ url: vnpUrl }, { status: 200 });

  } catch (error) {
    console.error("VNPay Create URL error:", error);
    return NextResponse.json({ error: "Lỗi tạo url thanh toán" }, { status: 500 });
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
