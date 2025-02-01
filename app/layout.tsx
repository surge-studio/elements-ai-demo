import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter as loadInter } from 'next/font/google';
import type { FC, ReactNode } from 'react';
import '../styles/globals.css';

const inter = loadInter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Elements AI Demo',
  description:
    'Next.js application demonstrating implementation of an Elements AI Visual using Rive.',
};

type RootLayoutProps = {
  readonly children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en" className="h-full">
    <body className={clsx(inter.className, 'h-full bg-gray-900 text-white')}>
      {children}
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
