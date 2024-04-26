"use client";

import { Member } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";

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
  const queryKey = `chat:${chatId}`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">...Loading</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-5 w-5 text-rose-300 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">...Something went wrong</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
    </div>
  );
};
