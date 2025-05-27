# Google Gemini Chat

A responsive React chat interface powered by Google's Gemini API. Built with Vite, TailwindCSS, and React, this app supports Markdown messages, code blocks, copying, real-time chat streaming with stop functionality, and persistent chat history via `localStorage`.

## Features

- Real-time chat with Google Gemini API
- Styled user & assistant message bubbles
- Chat history persists via `localStorage`
- Stop assistant response while typing
- Clear entire chat history
- Copy full text or individual code blocks
- Markdown & syntax-highlighted code support
- Fully responsive and keyboard accessible

---

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/surajroy7430/Google-Gemini-Chat.git
cd Google-Gemini-Chat
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Key

Create a `.env.local` file in the root and add:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## Context & State Management

- `ChatContext` handles:

  - All messages: `{ role: 'user' | 'assistant', text: string, timestamp: Date }`
  - Message updates from user and Gemini
  - Chat history persistence via `localStorage`

---

## Chat Flow

1. User types a message and send message via **Enter** key or click **Send** button
2. Message is added to context
3. Gemini API is called using `axios`
4. While waiting:
   - Input and Buttons are disabled
   - Skeleton loader shows
5. On success:
   - Assistant message is shown
6. Errors are handled gracefully
7. Chat auto-scrolls to latest message

---

## Styling

- TailwindCSS with responsive utility classes
- Scrollable and styled containers
- Custom scrollbar via `tailwind-scrollbar`

---

## Scripts

```bash
# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Screenshots

- Desktop
![Welcome_Page](https://i.ibb.co/3YFNCpwg/image.png)
![Skeleton_Loader](https://i.ibb.co/ynf1k2nS/image-1.png)
![Typed_Text](https://i.ibb.co/0yChCxkk/image-8.png)
![Replied_Code_Block](https://i.ibb.co/RkZfHWfV/image-2.png)

- Mobile
![Welcome_Page_M](https://i.ibb.co/d4tytMKz/image-7.png)
![Assistant_Reply](https://i.ibb.co/ynTHJqgs/image-5.png)
