import clsx from 'clsx';
import type { FC } from 'react';
import type { Message } from 'ai';

type ChatMessageProps = {
  readonly message: Message;
};

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => (
  <div
    className={clsx(
      'py-2 rounded shadow-md px-4 w-fit',
      message.role === 'user'
        ? 'self-end ml-auto bg-purple-700'
        : 'self-start text-white bg-gray-800'
    )}
  >
    {message.content}
  </div>
);
