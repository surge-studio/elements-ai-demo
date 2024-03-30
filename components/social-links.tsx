import type { FC } from 'react';

export const SocialLinks: FC = () => (
  <div className="flex justify-end w-full">
    <a
      href="https://github.com/surge-studio/elements-ai-demo"
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs font-medium tracking-widest text-gray-400 uppercase transition outline-none focus-visible:underline hover:text-purple-600"
    >
      GitHub
    </a>
  </div>
);
