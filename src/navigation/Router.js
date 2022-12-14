import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthNavigation from './AuthNavigation';
import HomeStack from './HomeStack';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/authSlice';

const Stack = createNativeStackNavigator();

const Router = () => {
  const user = useSelector(selectUser);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <Stack.Screen name="HomeStack" component={HomeStack} />
        ) : (
          <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
