import type { UIMessage } from 'ai';
import clsx from 'clsx';
import type { FC } from 'react';
import { Streamdown } from 'streamdown';

type ChatMessageProps = {
  message: UIMessage;
  isLoading: boolean;
};

export const ChatMessage: FC<ChatMessageProps> = ({ message, isLoading }) => (
  <div
    className={clsx(
      'w-fit shrink-0 rounded-sm px-5 py-3 text-lg leading-relaxed shadow-md',
      message.role === 'user'
        ? 'ml-auto self-end bg-purple-600'
        : 'self-start bg-gray-800/50 text-white'
    )}
  >
    {message.parts
      .filter((part) => part.type === 'text')
      .map((part, index) => (
        <Streamdown
          key={index}
          isAnimating={message.role === 'assistant' && isLoading}
        >
          {part.text}
        </Streamdown>
      ))}
  </div>
);
