import { Inter as loadInter } from 'next/font/google';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import type { Metadata } from 'next';
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
    <body className={clsx(inter.className, 'text-white bg-gray-900 h-full')}>
      {children}
    </body>
  </html>
);

export default RootLayout;
