    // app/(tabs)/settings/_layout.tsx
    import { Stack } from 'expo-router';
   
    export default function LoginStackLayout() {
      return (
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Login' }} />
          <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
          <Stack.Screen name="sendOTP" options={{ title: 'Send OTP' }} />
           <Stack.Screen name="validateOTP" options={{ title: 'OTP validate' }} />
            <Stack.Screen name="success" options={{ title: 'Success' }} />
            <Stack.Screen name="failure" options={{ title: 'failure' }} />
                     
        </Stack>
      );
    }

    