import {ApolloProvider} from '@apollo/client';
import AuthContextProvider from '@context/AuthContextProvider';
import BottomTabContextProvider from '@context/BottomTabContext';
import ThemeContextProvider from '@context/ThemeContext';
import {client} from '@graphql/client';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainApp from './app/MainApp';

export const HOST = '192.168.100.236';
export const PORT = '3001';

const App = () => {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <ThemeContextProvider>
          <BottomTabContextProvider>
            <AuthContextProvider>
              <MainApp />
            </AuthContextProvider>
          </BottomTabContextProvider>
        </ThemeContextProvider>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default App;
