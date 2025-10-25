import { Tabs } from "expo-router";
import {Ionicons} from "@expo/vector-icons"
 import { useColorScheme } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
        <Tabs.Screen
          name="index" // Corresponds to app/(tabs)/index.tsx
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="settings" // Corresponds to app/(tabs)/settings.tsx
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <Ionicons name="settings" color={color} size={24} />,
          }}
        />
      </Tabs>
    )
}

