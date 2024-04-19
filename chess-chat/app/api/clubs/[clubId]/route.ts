import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      clubId: string;
    };
  }
) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.clubId) {
      return new NextResponse("Club Id Missing", { status: 400 });
    }

    // Update the club
    const club = await db.club.update({
      where: {
        id: params.clubId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(club);
  } catch (error) {
    console.log("[CLUB_ID_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      clubId: string;
    };
  }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.clubId) {
      return new NextResponse("Club Id Missing", { status: 400 });
    }

    // Update the club
    const club = await db.club.delete({
      where: {
        id: params.clubId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(club);
  } catch (error) {
    console.log("[CLUB_ID_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}