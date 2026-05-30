import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyResetToken } from "@/lib/token";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Mã xác thực và mật khẩu mới là bắt buộc" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu phải chứa ít nhất 6 ký tự" },
        { status: 400 }
      );
    }

    // Verify token and extract email
    const email = verifyResetToken(token);

    if (!email) {
      return NextResponse.json(
        { error: "Liên kết đặt lại mật khẩu đã hết hạn hoặc không hợp lệ" },
        { status: 400 }
      );
    }

    // Fetch user to confirm existence
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Người dùng không tồn tại trên hệ thống" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    console.log(`[PASSWORD RESET SUCCESS] Email: ${email} updated their password successfully.`);

    return NextResponse.json(
      { message: "Đặt lại mật khẩu thành công" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password route error:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra trong quá trình xử lý" },
      { status: 500 }
    );
  }
}
