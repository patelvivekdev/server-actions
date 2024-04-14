import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Server Actions',
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
        <Toaster position='top-right' />
      </body>
    </html>
  );
}
