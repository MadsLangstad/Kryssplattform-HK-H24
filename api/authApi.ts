import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export const signIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed in: ", userCredential);
    })
    .catch((error) => {
      console.error("Error signing in: ", error);
    });
};

export const signOut = async () => {
  await auth.signOut().then(() => {
    console.log("User signed out");
  });
};
