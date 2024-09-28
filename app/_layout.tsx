import { AuthSessionProvider } from "@/providers/authctx";
import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthSessionProvider>
      <Slot />
    </AuthSessionProvider>
    // <Stack>
    //   <Stack.Screen
    //     name="(tabs)"
    //     options={{
    //       headerShown: false,
    //       title: "Hjem",
    //     }}
    //   />
    //   <Stack.Screen name="postDetails/[id]" />
    // </Stack>
  );
}
