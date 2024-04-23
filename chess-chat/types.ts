import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import { Club, Member, Profile } from "@prisma/client";

// Combine the types to use efficiently such as seen in members-modal where
// Both the club & members objects as well as their info are needed
export type ClubWithMembersWithProfiles = Club & {
  members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
