    // app/(tabs)/settings/_layout.tsx
    import { Stack } from 'expo-router';

    export default function TourismStackLayout() {
      return (
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Tour Categories' }} />
          <Stack.Screen name="tripList" options={{ title: 'Scheduled trips' }} />
           <Stack.Screen name="tripDetails" options={{ title: 'Trip Details' }} />
           <Stack.Screen name="bookTrip" options={{ title: 'Book your Trip' }} />
           <Stack.Screen name="previewbooking" options={{ title: 'Review your Booking' }} />
           <Stack.Screen name="editTrip" options={{ title: 'Edit My Trip' }} />
           <Stack.Screen name="payfortrip" options={{ title: 'Complete Payment' }} />
           <Stack.Screen name="confirmbooking" options={{ title: 'Booking Confirmation' }} />
        </Stack>
      );
    }

    