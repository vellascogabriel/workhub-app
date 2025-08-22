import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navbar/NavBar";
import { AuthModalProvider } from "./context/AuthModalContext";
import { WorkspaceModalProvider } from "./context/WorkspaceModalContext";
import ModalsProvider from "./components/modals/ModalsProvider";
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
            <WorkspaceModalProvider>
              <NavBar />
              <div className="pt-20">
                {/* Categories moved to page component to prevent hydration errors */}
              </div>
              <ModalsProvider />
              {children}
            </WorkspaceModalProvider>
          </AuthModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
