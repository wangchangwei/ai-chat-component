import { memo } from 'react';
import './ChatBubble.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatBubbleProps {
  message: Message;
}

function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`chat-bubble ${isUser ? 'user' : 'assistant'}`}>
      <div className="chat-bubble-avatar">
        {isUser ? '👤' : '🤖'}
      </div>
      <div className="chat-bubble-content">
        <div className="chat-bubble-message">{message.content}</div>
        <div className="chat-bubble-time">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

export default memo(ChatBubble);
