import { Club, Member, Profile } from "@prisma/client";

export type ClubWithMembersWithProfiles = Club & {
  members: (Member & { profile: Profile })[];
};
