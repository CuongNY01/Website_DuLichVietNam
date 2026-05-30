import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateResetToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email là bắt buộc" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Email không tồn tại trên hệ thống" }, { status: 400 });
    }

    // Token valid for 1 hour
    const oneHour = 60 * 60 * 1000;
    const expiry = Date.now() + oneHour;
    const token = generateResetToken(email, expiry);

    // Determine protocol and host to generate absolute link
    const origin = req.headers.get("origin") || "http://localhost:3000";
    const resetLink = `${origin}/reset-password?token=${token}`;

    console.log(`[PASSWORD RESET REQUEST] Email: ${email}`);
    console.log(`[PASSWORD RESET REQUEST] Link: ${resetLink}`);

    let emailSent = false;
    let mailErrorMsg = "";

    try {
      emailSent = await sendPasswordResetEmail(email, user.name, resetLink);
      if (!emailSent) {
        throw new Error("sendMail returned false");
      }
    } catch (mailError: any) {
      console.error("Failed to send password reset email via SMTP:", mailError);
      mailErrorMsg = mailError.message || "Lỗi SMTP";
      
      // If we are in production, fail the request since SMTP must work there
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { error: "Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      message: "Đã gửi hướng dẫn đặt lại mật khẩu",
      emailSent,
      mailError: mailErrorMsg || undefined,
      // Provide direct link in development mode to bypass SMTP restrictions if needed
      devLink: process.env.NODE_ENV !== "production" ? resetLink : undefined,
    });
  } catch (error) {
    console.error("Forgot password route error:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra trong quá trình xử lý" },
      { status: 500 }
    );
  }
}
