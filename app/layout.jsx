import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: "HSR Showcase",
  description: "View and create a character showcase card for Honkai: Star Rail",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
