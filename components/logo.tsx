import type { FC } from 'react';

export const Logo: FC = () => (
  <a
    href="https://elements.surge.studio"
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex flex-col font-medium text-gray-400 text-xs uppercase tracking-widest outline-none transition hover:text-purple-600 focus-visible:underline"
  >
    <span className="block w-fit text-gray-200 transition group-hover:text-purple-600">
      Elements
    </span>
    <span className="block w-fit">AI Demo</span>
  </a>
);
