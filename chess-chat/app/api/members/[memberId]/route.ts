import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: {
        params: {
            memberId: string
        }
    }
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const { role } = await req.json();

        // Get the club ID based on route, Must be same as bracketed folder name 
        const clubId = searchParams.get("clubId")

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!clubId) {
            return new NextResponse("Club ID Missing", { status: 400 });
        }
        if (!params.memberId) {
            return new NextResponse("Member ID Missing", { status: 400 });
        }

        const club = await db.club.update({
            where: { // Find the club based on clubID and Admin
                id: clubId,
                profileId: profile.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: params.memberId, // Find this member based on ID
                            profileId: { // Cannot update your own roles
                                not: profile.id
                            }
                        },
                        data: {
                            role // Update the role of the member based on pased params
                        }
                    },
                }
            },
            include: { // Used to render the manage members modal
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        })

        return NextResponse.json(club);

    } catch (error) {
        console.log("[MEMBERS_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}