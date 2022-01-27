import {gql} from '@apollo/client';

export const FETCH_ALL_DATA = gql`
  query {
    cats {
      breed
      characteristics
    }
  }
`;

export const FETCH_ALL_TRACKS = gql`
  query {
    tracks {
      id
      url
      title
      artist
      artwork
      album
      duration
      image
      category
      type
    }
  }
`;
