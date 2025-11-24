
Use google login for IOS, refer here:-
https://react-native-google-signin.github.io/docs/setting-up/expo#add-config-plugin

Use google login for Android, refer here:- 

Run android build for expo :-

npx expo run:android

Get package name from app.json

Get SHA-1 certificaticate fingerprint using keytool
keytool -list -v -keystore ./app/debug.keystore -alias androiddebugkey -storepass android -keypass android

https://nishant-kr.medium.com/implementing-google-auth-with-react-native-expo-app-48005897ab21


eas build --profile development --platform android
eas build --profile development --platform ios
