import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { clubId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.clubId) {
      return new NextResponse("Club Id missing", { status: 400 });
    }
    const club = await db.club.update({
      where: {
        id: params.clubId,
        profileId: {
          not: profile.id, // Admin cannot leave the club he/she is the owner of
        },
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });

    return NextResponse.json(club);
  } catch (error) {
    console.log("{CLUB_ID_LEAVE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
