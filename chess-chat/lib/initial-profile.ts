import { currentUser, redirectToSignIn } from "@clerk/nextjs";


export const initialProfile = async () => {
    const user = await currentUser();

    if(!user) {
        return redirectToSignIn();
    }

    const profile = await db.profile.findUnique({
        where: {
            userId.id
        }
    });

    if(profile) {
        return profile
    }



}