import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navbar/NavBar";
import Modal from "./components/modals/Modal";

export const metadata: Metadata = {
  title: "Workhub",
  description: "Best place to work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <Modal  isOpen actionLabel="" />
        {children}
      </body>
    </html>
  );
}
