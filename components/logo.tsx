import { FC } from 'react';

export const Logo: FC = () => {
  return (
    <a
      href="https://elements.surge.studio"
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs outline-none focus-visible:underline font-medium tracking-widest text-gray-400 uppercase hover:text-white transition"
    >
      <span className="w-fit block">Elements</span>
      <span className="w-fit block">AI Visual Demo</span>
    </a>
  );
};
