import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// importa Context do Usuário carregando as informações do usuário logado
import UserContextProvider from './src/contexts/UserContext';
// importa Mainstack responsável pelas telas do sistema
import MainStack from './src/stacks/MainStack';

export default () => {
  return(
    <UserContextProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </UserContextProvider>
  );
}