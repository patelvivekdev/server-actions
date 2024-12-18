import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Server Actions by patelvivek.dev',
  description: 'Learn server actions with patelvivek.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`bg-zinc-500 ${inter.className}`}>
        <Navbar />
        {children}
        <Toaster position='bottom-right' />
      </body>
    </html>
  );
}
