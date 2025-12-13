import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Manuel Solis Law Firm',
  description: 'Professional legal services - Immigration, Family Law, Criminal Law, Accidents',
  
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#009b3a' },
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
  
  themeColor: '#051120',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}