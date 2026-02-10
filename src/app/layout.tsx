import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Immersive Sweden',
  description: 'Interactive 3D map of Sweden with organizations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}