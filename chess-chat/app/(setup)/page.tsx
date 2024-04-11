import { redirect } from "next/navigation";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";

const SetupPage = async () => {
    const profile = await initialProfile();

    // Attempt to find any server that the profile is a member of
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    // Redirect them to the server they are part of
    if(server) {
        return redirect(`/servers/${server.id}`);
    }

    // If not use a modal to create one

  return <div> Create a Club!</div>;
};

export default SetupPage;
