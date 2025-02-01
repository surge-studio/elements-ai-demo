import type { FC } from 'react';

export const SocialLinks: FC = () => (
  <div className="flex w-full justify-end">
    <a
      href="https://github.com/surge-studio/elements-ai-demo"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-gray-400 text-xs uppercase tracking-widest outline-none transition hover:text-purple-600 focus-visible:underline"
    >
      GitHub
    </a>
  </div>
);
