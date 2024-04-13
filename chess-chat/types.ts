import { Club, Member, Profile } from "@prisma/client";

// Combine the types to use efficiently such as seen in members-modal where
// Both the club & members objects as well as their info are needed
export type ClubWithMembersWithProfiles = Club & {
  members: (Member & { profile: Profile })[];
};
