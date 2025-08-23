import type { Metadata } from 'next';
import './globals.css';
import NavBar from './components/navbar/NavBar';
import { AuthModalProvider } from './context/AuthModalContext';
import { WorkspaceModalProvider } from './context/WorkspaceModalContext';
import ModalsProvider from './components/modals/ModalsProvider';
import AuthProvider from './providers/AuthProvider';
import CloudinaryProvider from './providers/CloudinaryProvider';
import { Toaster } from 'react-hot-toast';
import ClientOnly from './components/ClientOnly';

export const metadata: Metadata = {
  title: 'Workhub',
  description: 'Find the perfect coworking space for your needs',
  openGraph: {
    title: 'Workhub',
    description: 'Find the perfect coworking space for your needs',
    url: 'https://workhub-app.vercel.app',
    siteName: 'Workhub',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/images/workhub-og.png',
        width: 1200,
        height: 630,
        alt: 'Workhub - Find the perfect coworking space',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workhub',
    description: 'Find the perfect coworking space for your needs',
    images: ['/images/workhub-og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        <AuthProvider>
          <CloudinaryProvider>
            <AuthModalProvider>
              <WorkspaceModalProvider>
                <NavBar />
                <div className="pt-20">
                  {/* Categories moved to page component to prevent hydration errors */}
                </div>
                <ClientOnly>
                  <ModalsProvider />
                </ClientOnly>
                {children}
              </WorkspaceModalProvider>
            </AuthModalProvider>
          </CloudinaryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
