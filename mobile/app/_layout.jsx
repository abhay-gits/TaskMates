import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore"

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token } = useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[]);

  useEffect(()=>{
    const isLoggedIn = user && token;
    const onAuthScreen = segments[0] === "(auth)";

    if(!isLoggedIn && !onAuthScreen) router.replace("/(auth)")
    else if(isLoggedIn && onAuthScreen) router.replace("/(tabs)")

  },[user, token, segments]);

  return (
    <Stack screenOptions={{headerShown: false}}>
      < Stack.Screen name="(tabs)" />
      < Stack.Screen name="(auth)" />
    </Stack>
  );
}
