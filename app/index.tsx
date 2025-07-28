import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import Home from './screens/Home';
import Login from './screens/Login';
import PrivacyPolicy from './screens/PrivacyPolicy';
import useAuthStore from './store/useAuthStore';
const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});


function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
    <Stack.Screen name="Login" component={Login} />     
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
}
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

const App = () => {
    const isLoggedIn = useAuthStore((state) => state.loggedIn);
  return isLoggedIn?<HomeStack />:<AuthStack />;
};


export default App;
