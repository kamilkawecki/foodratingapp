import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/layout/Header";
import { UserProvider } from "@/lib/context/UserContext";

export const metadata: Metadata = {
  title: "Food Rating App",
  description: "Reciepes and Dish Ratings",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <UserProvider>
          <Header />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
