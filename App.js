import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';  // Placeholder for post-login screen
import CreateRoomScreen from './screens/CreateRoomScreen';
import JoinRoomScreen from './screens/JoinRoomScreen';
import RoomDashboard from './screens/RoomDashboard';
import EditPostScreen from './screens/EditPostScreen';
import PostViewerScreen from './screens/PostViewerScreen';
import RoomDetailsScreen from './screens/RoomDetailsScreen';
import PostsGridScreen from './screens/PostsGridScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateRoom" component={CreateRoomScreen} />
        <Stack.Screen name="JoinRoom" component={JoinRoomScreen}/>
        <Stack.Screen name="RoomDashboard" component={RoomDashboard} />
        <Stack.Screen name="EditPostScreen" component={EditPostScreen} />
        <Stack.Screen name="PostViewerScreen" component={PostViewerScreen} />
        <Stack.Screen name="RoomDetails" component={RoomDetailsScreen} />
        <Stack.Screen name="PostsGrid" component={PostsGridScreen} />        
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}
