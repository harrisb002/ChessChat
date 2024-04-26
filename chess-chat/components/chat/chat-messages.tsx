"use client";

import { Member } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";

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
  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
    </div>
  );
};
