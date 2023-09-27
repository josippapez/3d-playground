import { ReactNode } from 'react';
import './globals.css';

export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'de' }];
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="bg-background overflow-hidden">
      <body>
        {/* <PageTransition /> */}
        {children}
      </body>
    </html>
  );
}
