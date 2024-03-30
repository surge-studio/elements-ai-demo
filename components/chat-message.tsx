import clsx from 'clsx';
import type { FC } from 'react';
import type { Message } from 'ai';

type ChatMessageProps = {
  readonly message: Message;
};

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => (
  <div
    className={clsx(
      'py-3 rounded shadow-md px-5 w-fit shrink-0 text-lg leading-relaxed',
      message.role === 'user'
        ? 'self-end ml-auto bg-purple-600'
        : 'self-start text-white bg-gray-800/50'
    )}
  >
    {message.content}
  </div>
);
