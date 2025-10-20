import { Tabs } from "expo-router";
import {Ionicons} from "@expo/vector-icons"
 import { useColorScheme } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false
        }}
        initialRouteName = "index"
        >
       
        <Tabs.Screen name = "loginsignup"  
        
        options={{title : "Login/SignUp" ,
            tabBarIcon: ({size,color}) =><Ionicons name="home" size={size} color={color}/>
        }}>
          </Tabs.Screen> 
         <Tabs.Screen name = "index" options={{title : "Our Products" ,
            tabBarIcon: ({size,color}) =><Ionicons name="cart-outline" size={size} color={color}/>
        }}
        
        >
        </Tabs.Screen> 
         </Tabs>
    )
}

