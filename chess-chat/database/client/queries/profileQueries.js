const { gql } = require('@apollo/client');

const GET_PROFILE = gql`
  query GetProfile($id: ID!) {
    profile(id: $id) {
      id
      userId
      name
      imageUrl
      email
      clubs {
        id
        name
      }
      channels {
        id
        name
      }
    }
  }
`;

const GET_PROFILES = gql`
  query GetProfiles {
    profiles {
      id
      userId
      name
      imageUrl
      email
      clubs {
        id
        name
      }
      channels {
        id
        name
      }
    }
  }
`;

module.exports = { GET_PROFILE, GET_PROFILES };
