import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const profile = await currentProfile();
        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);

        const clubId = searchParams.get("clubId")

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!clubId) {
            return new NextResponse("Club Id Missing", { status: 400 });
        }

        // Trying to make channel name general, reject. Allows for easy default redirection to general
        if(name === "general") {
            return new NextResponse("Name cannot be general", { status: 400 });
        }

        // Update the club
        const club = await db.club.update({
            where: {
                id: clubId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: { // Must be a member with a role
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    create: {
                        profileId: profile.id,
                        name,
                        type,
                    }
                }
            },
        });

        return NextResponse.json(club);
    } catch (error) {
        console.log("[CHANNEL_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
