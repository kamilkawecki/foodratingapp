import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/layout/Header";

export const metadata: Metadata = {
  title: "Food Rating App",
  description: "Reciepes and Dish Ratings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
