    // app/(tabs)/settings/_layout.tsx
    import { Stack } from 'expo-router';
 
    export default function LoginStackLayout() {
      return (
        <Stack  screenOptions={{
            headerStyle: { backgroundColor: '#4e4cbbff' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}>
          <Stack.Screen name="index" options={{title: 'Mitram Login' }} />
          <Stack.Screen name="signup" options={{ title: 'Mitram Sign Up' }} />
          <Stack.Screen name="sendOTP" options={{ title: 'Send OTP' }} />
           <Stack.Screen name="validateOTP" options={{ title: 'OTP validate' }} />
            <Stack.Screen name="success" options={{ title: 'Success' }} />
            <Stack.Screen name="failure" options={{ title: 'failure' }} />
             <Stack.Screen name="profile" options={{ title: 'User Profile',
                 headerStyle: {
                    backgroundColor: '#967369ff', // Custom header background color
                  },
                  headerTintColor: '#fff', // Custom header text color
                  headerTitleStyle: {
                    fontWeight: 'bold', // Custom header title style
                  }
             }} />
                     
        </Stack>
      );
    }

    