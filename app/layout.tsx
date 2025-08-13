import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navbar/NavBar";
import { AuthModalProvider } from "./context/AuthModalContext";
import AuthModals from "./components/modals/AuthModals";
import AuthProvider from "./providers/AuthProvider";

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
        <AuthProvider>
          <AuthModalProvider>
            <NavBar />
            <AuthModals />
            {children}
          </AuthModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
