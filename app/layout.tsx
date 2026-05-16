import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientSessionProvider } from "../components/SessionProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Du Lịch Việt Nam - Đặt Tour & Khách Sạn Trực Tuyến",
  description: "Trang đặt tour du lịch cao cấp hàng đầu Việt Nam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body>
        <ClientSessionProvider>
          <Header />
          {children}
          <Footer />
          <ChatBot />
        </ClientSessionProvider>
      </body>
    </html>
  );
}
