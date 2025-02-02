import type { Message } from 'ai';
import clsx from 'clsx';
import type { FC } from 'react';

type ChatMessageProps = {
  readonly message: Message;
};

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => (
  <div
    className={clsx(
      'w-fit shrink-0 rounded-sm px-5 py-3 text-lg leading-relaxed shadow-md',
      message.role === 'user'
        ? 'ml-auto self-end bg-purple-600'
        : 'self-start bg-gray-800/50 text-white'
    )}
  >
    {message.content}
  </div>
);
