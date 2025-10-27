    // app/(tabs)/settings/_layout.tsx
    import { Stack } from 'expo-router';

    export default function TourismStackLayout() {
      return (
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Tour Categories' }} />
          <Stack.Screen name="tripList" options={{ title: 'Scheduled trips' }} />
           <Stack.Screen name="tripDetails" options={{ title: 'Trip Details' }} />
           <Stack.Screen name="bookTrip" options={{ title: 'Book your Trip' }} />
           <Stack.Screen name="previewbooking" options={{ title: 'Edit your Booking' }} />
           <Stack.Screen name="confirmbooking" options={{ title: 'Booking Confirmation' }} />
        </Stack>
      );
    }