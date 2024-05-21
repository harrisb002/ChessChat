import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";

// Fetching 20 X 20 messages for batches
const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    // Cursor will be used to tell the infinite load from what message to load the next batch of messages
    // this pagination can be done in other ways, like using the skip method.
    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");

    console.log("Cursor is: ", cursor)

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!channelId) {
      return new NextResponse("Channel Id Missing", { status: 400 });
    }

    let messages: Message[] = [];

    // Query from the curson if defined
    if (cursor) {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        skip: 1, // Dont want to repeat the message which the cursor is on
        cursor: {
          // Built in from prisma for pagination
          id: cursor,
        },
        where: {
          channelId, // paramKey being used in use-chat-query useChatQuery()
        },
        include: {
          // Get all members and their profiles to render all messages
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc", // Reverse messages
        },
      })
    } else {
      //if no cursor
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        where: {
          channelId
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCusor = null;

    // Create the next cursor for the infinte load using the length of the messages
    // If messages.length < MESSAGES_BATCH then it has hit end for infinite load, ie no more messages
    if (messages.length === MESSAGES_BATCH) {
      nextCusor = messages[MESSAGES_BATCH - 1].id;
    }

 
    // Give the data back
    return NextResponse.json({
      items: messages,
      nextCusor,
    });
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
