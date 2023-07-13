import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import Footer from './Footer';

export const metadata = {
  title: 'HSR Showcase',
  description: 'View and create a character showcase card for Honkai: Star Rail',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="Blur-BG no-scrollbar bg-fixed font-sans font-semibold text-white">
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
