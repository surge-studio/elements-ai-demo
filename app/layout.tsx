import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
    <body className={clsx(inter.className, 'text-white bg-gray-900 h-full')}>
      {children}
    </body>
  </html>
);

export default RootLayout;
