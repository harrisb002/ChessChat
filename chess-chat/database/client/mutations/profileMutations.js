import { gql } from "@apollo/client";

const CREATE_PROFILE = gql`
  mutation CreateProfile($input: ProfileInput!) {
    createProfile(input: $input) {
      id
      userId
      name
      imageUrl
      email
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($id: ID!, $input: ProfileInput!) {
    updateProfile(id: $id, input: $input) {
      id
      userId
      name
      imageUrl
      email
    }
  }
`;

const DELETE_PROFILE = gql`
  mutation DeleteProfile($id: ID!) {
    deleteProfile(id: $id) {
      id
    }
  }
`;

export { CREATE_PROFILE, UPDATE_PROFILE, DELETE_PROFILE };
