import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSP Workflow',
  description: 'Crystal Structure Prediction Workflow Application',
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