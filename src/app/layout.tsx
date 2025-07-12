import type {Metadata} from 'next';
import './globals.css';
import { AppHeader } from '@/components/app-header';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'CodeGram - Social Platform for Coders',
  description: 'A social platform for coders, hackers, and tech enthusiasts to share and discover code.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AppHeader />
        <main className="container mx-auto px-4 py-8">
            {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
