# Chess Chat

## Description

Chess Chat is a chess app built using Next.js 13, React, Socket.io, Tailwind, Prisma, and Supabase.
This app will enable the below functionality for users of the SSUChess app

### Features

- Real-time messaging using [Socket.io](https://socket.io/)
  - Create Text, Audio and Video call Channels
  - 1:1 video calls and conversation between members
  - Delete & Edit messages in real time
  - Websocket fallback: Polling with alerts
  - Unique invite link generation
- Ability to manage members in a club as Admin of club
- Authentication with Clerk [ClerkDocs](https://clerk.com/docs/quickstarts/nextjs)
- Send attachments as messages using [uploadthing](https://uploadthing.com/)
- ORM (Object-Realtional Model) using (Prisma)[https://www.prisma.io/docs/orm/overview/databases/postgresql]
- POSTGRES database using (supabase)[https://supabase.com/docs]

- Tanstack is awesome for async/server-side state management!

  - [Tanstack Query Github](https://github.com/TanStack/query)
  - Loading messages using [tanstack](https://tanstack.com/query/latest)

- Using Cursor for fetching messages in batches
  - [Cursor Pagination Docs](https://www.prisma.io/docs/orm/prisma-client/queries/pagination#cursor-based-pagination)

### Scripts

- Run the development server: `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Other Docs

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial.
- Deploy Next.js app using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

### Useful Commands

- Prisma:

  - `npx prisma init`
  - `npx prisma generate` : To update schema in node modules upon each change
  - `npx prisma db push` : Create the collections in the database (supabase for me)
  - `npx prisma studio` : Loads the prisma studio
  - `npx prisma migrate reset` : Reset the db

- Other
  - `zustand` is great for state-management and is being used as a store to create my modals
  - using zod for form submition hooks/handeling `@hookform/resolvers/zod`
  - using lucid react and shadcn for ton of components `lucide-react` & `npx shadcn-ui@latest init` and install components into dir.
    - [shadcn UI](https://ui.shadcn.com/docs/installation/next)
    - [lucid react](https://lucide.dev/guide/packages/lucide-react)
