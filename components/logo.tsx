import type { FC } from 'react';

export const Logo: FC = () => (
  <a
    href="https://elements.surge.studio"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex flex-col text-xs font-medium tracking-widest text-gray-400 uppercase transition outline-none group focus-visible:underline hover:text-purple-600"
  >
    <span className="block text-gray-200 transition w-fit group-hover:text-purple-600">
      Elements
    </span>
    <span className="block w-fit">AI Demo</span>
  </a>
);
