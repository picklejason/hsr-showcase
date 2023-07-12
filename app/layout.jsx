import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
