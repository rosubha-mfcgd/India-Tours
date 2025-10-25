import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{
        contentStyle: { backgroundColor: 'lightblue' }, // Set background for this screen
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
