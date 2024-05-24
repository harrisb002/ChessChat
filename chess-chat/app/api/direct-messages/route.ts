import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { DirectMessage } from "@prisma/client";
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

    // chess-chat/app/(main)/(routes)/clubs/[clubId]/conversations/[memberId]/page.tsx 
    // The above defines the paramKey as `conversationId`
    const conversationId = searchParams.get("conversationId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!conversationId) {
      return new NextResponse("Channel Id Missing", { status: 400 });
    }

    let messages: DirectMessage[] = [];

    // Query from the curson if defined
    if (cursor) {
      messages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        skip: 1, 
        cursor: {
          id: cursor,
        },
        where: {
          conversationId, 
        },
        include: {
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
      messages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        where: {
          conversationId
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

    let nextCursor = null;

    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id;
    }


    // Give the data back
    return NextResponse.json({
      items: messages,
      nextCursor,
    });
  } catch (error) {
    console.log("[DIRECT_MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
