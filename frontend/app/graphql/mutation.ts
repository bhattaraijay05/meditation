import {gql} from '@apollo/client';

export const UPLOAD_MUSIC = gql`
  mutation AddTrack(
    $id: String!
    $url: String!
    $title: String!
    $artist: String!
    $artwork: String!
    $album: String!
    $duration: Float!
    $image: String!
    $category: [String!]!
    $type: [String!]!
  ) {
    createTrack(
      input: {
        id: $id
        url: $url
        title: $title
        artist: $artist
        artwork: $artwork
        album: $album
        duration: $duration
        category: $category
        type: $type
        image: $image
      }
    ) {
      id
      title
    }
  }
`;

export const DELETE_TRACK = gql`
  mutation DeleteTrack($id: String!) {
    removeTrack(id: $id) {
      id
    }
  }
`;

export const UPDATE_TRACK_TITLE = gql`
  mutation UpdateTitle($id: String!, $title: String!) {
    updateTitle(id: $id, title: $title) {
      id
      title
      album
      artist
    }
  }
`;
