// GraphQL Types
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

// Mongoose Models
const Channel = require("../models/Channel");
const Profile = require("../models/Profile");
const Club = require("../models/Club");
const Member = require("../models/Member");

const ChannelType = new GraphQLObjectType({
  name: "Channel",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    type: {
      type: new GraphQLEnumType({
        name: "ChannelType",
        values: {
          TEXT: { value: "TEXT" },
          AUDIO: { value: "AUDIO" },
          VIDEO: { value: "VIDEO" },
        },
      }),
      defaultValue: "TEXT",
    },
    profile: {
      type: ProfileType,
      resolve(parent, args) {
        return Profile.findById(parent.profileId);
      },
    },
    club: {
      type: ClubType,
      resolve(parent, args) {
        return Club.findById(parent.clubId);
      },
    },
  }),
});

const ProfileType = new GraphQLObjectType({
  name: "Profile",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    imageUrl: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    clubs: {
      type: new GraphQLList(ClubType),
      resolve(parent, args) {
        return Club.find({ _id: { $in: parent.clubs } });
      },
    },
    members: {
      type: new GraphQLList(MemberType),
      resolve(parent, args) {
        return Member.find({ profileId: parent.id });
      },
    },
    channels: {
      type: new GraphQLList(ChannelType),
      resolve(parent, args) {
        return Channel.find({ profileId: parent.id });
      },
    },
  }),
});

const ClubType = new GraphQLObjectType({
  name: "Club",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    imageUrl: { type: GraphQLString },
    inviteCode: { type: GraphQLString },
    profile: {
      type: ProfileType,
      resolve(parent, args) {
        return Profile.findById(parent.profileId);
      },
    },
  }),
});

const MemberType = new GraphQLObjectType({
  name: "Member",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    role: {
      type: new GraphQLEnumType({
        name: "MemberRole",
        values: {
          GUEST: { value: "GUEST" },
          MEMBER: { value: "MEMBER" },
          ADMIN: { value: "ADMIN" },
          // Add other roles as needed
        },
      }),
      defaultValue: "GUEST",
    },
    profile: {
      type: ProfileType,
      resolve(parent, args) {
        return Profile.findById(parent.profileId);
      },
    },
    server: {
      type: ClubType,
      resolve(parent, args) {
        return Club.findById(parent.serverId);
      },
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    channel: {
      type: ChannelType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Channel.findById(args.id);
      },
    },
    profile: {
      type: ProfileType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Profile.findById(args.id);
      },
    },
    club: {
      type: ClubType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Club.findById(args.id);
      },
    },
    member: {
      type: MemberType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Member.findById(args.id);
      },
    },
  },
});

// Mutations will go here

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutation // Not yet implemented Mutations
});
