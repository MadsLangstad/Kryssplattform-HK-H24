import { getStorageRef } from "@/firebaseConfig";
import { uploadBytes } from "firebase/storage";

export const uploadImageToFirebase = async (uri: string) => {
  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob();

  const imagePath = uri.split("/").pop()?.split(".")[0] ?? "anonymtBilde";
  console.log("ImagePath: ", imagePath);

  const uploadPath = `images/${imagePath}`;

  const imageRef = getStorageRef(uploadPath);

  try {
    console.log("please");
    await uploadBytes(imageRef, blob);
    console.log(`Image uploaded to ${imagePath}`);
    return uploadPath;
  } catch (error) {
    console.error(`Failed to upload image to ${imagePath}: `, error);
    return "ERROR";
  }
};
