import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
 
import './globals.css'
import Header from "./Components/Header";
import DownFooter from "./Components/DownFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ali Raza Ecommerce",
  description: "A complete e-commerce application with Next.js and Wix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className} >
   <Header />
          <Navbar />
          {children}
          <Footer />
          <DownFooter />
        </body>
      </html>
  );
}

 
