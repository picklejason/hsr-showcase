import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import Footer from './Footer';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata = {
  title: 'HSR Showcase',
  description: 'View and create a character showcase card for Honkai: Star Rail',
  icons: {
    icon: '/favicon.ico',
  },
  keywords: ['Honkai Star Rail', 'HSR', 'HSR Showcase', 'HSR Build Card'],
  alternates: {
    canonical: 'https://www.hsr-showcase.com/',
  },
  openGraph: {
    locale: 'en_US',
    url: 'https://www.hsr-showcase.com/',
    title: 'HSR Showcase',
    description: 'Fetch data from your Trailblazer Profile and display a build card for Honkai: Star Rail',
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
    <html lang="en" className={nunito.variable}>
      <body className="Blur-BG no-scrollbar bg-fixed font-semibold text-white">
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
