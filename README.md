# AI Chat Component

A modern, reusable React chat component for AI conversations.

## Features

- Clean, modern UI with chat bubbles
- Typing indicators
- Message timestamps
- Customizable API endpoint
- Fully typed with TypeScript
- Responsive design

## Installation

```bash
npm install
```

## Usage

```tsx
import { Chat } from './components';

function App() {
  return <Chat apiEndpoint="/api/chat" />;
}
```

## Development

```bash
npm run dev    # Start dev server
npm run build # Build for production
```

## API

The component expects your API to return responses in this format:

```json
{
  "content": "AI response text"
}
```

Or:

```json
{
  "message": "AI response text"
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiEndpoint` | `string` | `/api/chat` | API endpoint for AI responses |
| `placeholder` | `string` | `'Type a message...'` | Input placeholder text |
