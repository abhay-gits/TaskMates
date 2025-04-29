import { Tabs } from 'expo-router'
import Ionicons from 'react-native-vector-icons/Ionicons'
import COLORS from '../../constants/colors'
export default function TabLayout() {
  return (
    <Tabs screenOptions={
      {headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          backgroundColor: COLORS.cardBackground,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          marginBottom: 1,
          height: 50,
        }
      }
      }>
        <Tabs.Screen 
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({color,size}) =><Ionicons name='home-outline' size={size} color={color}/>
        }}
        />
        <Tabs.Screen name='friends'
        options={{
          title: "Friends",
          tabBarIcon: ({color,size}) =><Ionicons name='people-outline' size={size} color={color}/>
        }} />
        <Tabs.Screen name='profile' 
        options={{
          title: "Profile",
          tabBarIcon: ({color,size}) =><Ionicons name='person-outline' size={20} color={color}/>
        }}/>
    </Tabs>
  )
}