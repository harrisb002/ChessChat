import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import db from '../database/config/connection';


export const intialProfile = async () => {
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