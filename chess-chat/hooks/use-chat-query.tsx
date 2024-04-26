import qs from "query-string";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

// This can be used for both one-on-one conversations as well as direct messages by using
// the paramKey & paramValue ("channelId" | "conversation")
export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  // Use QueryFunctionContext to use custom queryFn to call REFS: https://tanstack.com/query/latest/docs/framework/react/guides/query-functions#queryfunctioncontext
  const fetchMessages = async ({ pageParam }: QueryFunctionContext) => {
    // pageParam will act as the cursor to allow for infinite loading

    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: String(pageParam),
          [paramKey]: paramValue,
        },
      },
      { skipNull: true }
    );
    const res = await fetch(url);
    console.log("The response from fetch messages is", res);
    return res.json();
  };

  // For Reference: https://tanstack.com/query/latest/docs/framework/react/reference/useInfiniteQuery#useinfinitequery
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: (pageParam) => fetchMessages(pageParam), // Function to call to request data
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage?.nextCursor, // Incase the API fails then use to reshresh
      refetchInterval: isConnected ? false : 1000, // Can rely on this if websockets not available
    });

    console.log("data: ", data);

    
    return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
