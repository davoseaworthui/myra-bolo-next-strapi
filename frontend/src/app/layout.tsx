import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import './globals.css';
import { inter } from '@/app/utils/fonts';
import BackgroundImage from '@/components/BackgroundImage';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { PopupWidget } from '@/components/PopupWidget';

export const metadata: Metadata = {
  title: 'Myra Bolo',
  description: 'Wealth Advisor, life coach',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
        /* style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          minHeight: '100vh', // Ensures the background image covers the entire page height
          backgroundImage: "url('/img/shutterstock2688690531.jpg')", // Path to your image
          backgroundRepeat: 'repeat', // Repeats the image to fill the viewport
          backgroundSize: 'auto', // Allows image to retain its original size
          backgroundPosition: 'center', // Centers the background image
        }} */
      >
        <ThemeProvider attribute="class">
          <Navbar />
          <div>{children}</div>
          <Footer />
          <PopupWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
