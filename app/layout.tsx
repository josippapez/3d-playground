import { ReactNode } from 'react';
import './globals.css';
import localFont from 'next/font/local';
import clsx from 'clsx';

const LemonRegular = localFont({
  src: [{ path: '../assets/fonts/Lemon-Regular.woff2' }],
  display: 'swap',
  variable: '--LemonRegular',
});

const LemonWide = localFont({
  src: [{ path: '../assets/fonts/Lemon-Wide.woff2' }],
  display: 'swap',
  variable: '--LemonWide',
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'overflow-hidden',
        LemonRegular.variable,
        LemonWide.variable,
      )}
    >
      <body>
        {/* <PageTransition /> */}
        {children}
      </body>
    </html>
  );
}
