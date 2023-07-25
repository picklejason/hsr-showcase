import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import Footer from './Footer';

export const metadata = {
  title: 'HSR Showcase',
  description: 'View and create a character showcase card for Honkai: Star Rail',
  icons: {
    icon: '/favicon.ico',
  },
  keywords: ['Honkai Star Rail', 'HSR', 'HSR Showcase'],
  openGraph: {
    locale: 'en_US',
    url: 'https://hsr-showcase.vercel.app/',
    title: 'HSR Showcase',
    description: 'View and create a character showcase card for Honkai: Star Rail',
    images: [
      {
        url: 'https://github.com/Mar-7th/StarRailRes/blob/master/icon/logo/bg.png?raw=true',
        width: 1340,
        height: 660,
        alt: 'HSR Showcase',
      },
      {
        url: 'https://github.com/Mar-7th/StarRailRes/blob/master/icon/sign/ShopTrainIcon.png?raw=true',
        width: 128,
        height: 128,
        alt: 'HSR Showcase',
      },
    ],
    site_name: 'HSR Showcase',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="Blur-BG no-scrollbar bg-fixed font-semibold text-white">
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
