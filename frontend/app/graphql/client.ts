import {ApolloClient, InMemoryCache} from '@apollo/client';
import {HOST, PORT} from '../../App';

export const client = new ApolloClient({
  uri: `http://${HOST}:${PORT}/graphql`,
  cache: new InMemoryCache(),
});
