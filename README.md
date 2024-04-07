# Chess Chat

## Description

Chess Chat is a chess app built using Next.js 13, React, Socket.io, Tailwind, Prisma, and MySQL.
This app will enable the below functionality for users of the SSUChess app

### Features

- Real-time messaging using [Socket.io](https://socket.io/)
  - Create Text, Audio and Video call Channels
  - 1:1 video calls and conversation between members
  - Delete & Edit messages in real time
  - Websocket fallback: Polling with alerts
  - Unique invite link generation
- Authentication with Clerk
- Ability to manage members in a club as Admin of club
- Send attachments as messages using [uploadthing](https://uploadthing.com/)
- Loading for messages in batches of 10 using [tanstack](https://tanstack.com/query/latest)
- ORM (Object-Realtional Model) using (Prisma)[https://www.prisma.io/]
- MySQL database using (Planetscale)[https://planetscale.com/]
