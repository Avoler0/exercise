import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/css/common.css";
import "./globals.css";
import Header from "src/app/header";
import ToastCmp from "src/component/Toast.Cmp";
import ModalCmp from "src/component/modal/Modal.Cmp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        <Header/>
        <main id="container">
          <div className="inner">
            {children}
          </div>
        </main>
        <ToastCmp />
        <ModalCmp />
      </body>
    </html>
  );
}
