import type { Metadata } from "next";
import { Open_Sans, Patua_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const patuaOne = Patua_One({
  variable: "--font-patua-one",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Langit Media Pro",
  description: "Your Trusted Production Partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${openSans.variable} ${patuaOne.variable} antialiased font-sans flex flex-col min-h-screen bg-[#19172A]`}>
        <Navbar />
        <main className="flex-grow overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
