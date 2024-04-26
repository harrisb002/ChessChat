"use client";

import { Member } from "@prisma/client";

// USed as modular props to be used both for one-one convos as well as channel convos
interface ChatMessagesProps {
  member: Member;
  name: string;
  chatId: string;
  apiUrl: string;
  type: "channel" | "conversation";

  socketUrl: string;
  socketQuery: Record<string, string>;

  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export const ChatMessages = ({
  member,
  name,
  chatId,
  apiUrl,
  type,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
}: ChatMessagesProps) => {
  return <div>Chat Messages</div>;
};
