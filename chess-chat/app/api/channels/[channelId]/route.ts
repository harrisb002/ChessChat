import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    {params}: {params: {channelId: string}}
) {
    try {
        const profile = await currentProfile();

        // Get clubId from search parameters
        const {searchParams} = new URL(req.url);
        const clubId = searchParams.get("clubId");

        if(!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        
        if(!clubId) {
            return new NextResponse("Club ID missing", {status: 400});
        }

        if(!params.channelId) {
            return new NextResponse("Channel ID missing", {status: 400});
        }

        const club = await db.club.update({
            where: {
                id: clubId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general",
                        }
                    }
                }
            }
        })

        return NextResponse.json(club);

    } catch (error) {
        console.log("[CHANNEL_ID_DELETE",error);
        return new NextResponse("Internal Error ", {status: 500});
    }


}