import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Delivery - Order Management",
  description: "Order your favorite food online with real-time tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <CartProvider>
          <Header />
          <main className="max-w-7xl mx-auto px-4 py-8">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
