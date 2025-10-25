import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      {/* <Stack.Screen name="index" options={{ title: 'Home' }} /> */}
      <Tabs.Screen name="index" options={{ title: 'Mitram Products' }} />
      <Tabs.Screen name="login" options={{ title: 'Login/Signup' }} />
    </Tabs>
  );
}
