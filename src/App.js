import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router/router.js';
import {StatusBar} from 'react-native';


function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#5AA469"/>
      <NavigationContainer>
        <Router/>
      </NavigationContainer>
    </>
  );
}

export default App;