import { PostData } from "@/utils/postData";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db, getDownloadUrl } from "@/firebaseConfig";
import { uploadImageToFirebase } from "./imageApi";
import { getDownloadURL } from "firebase/storage";

export const createPost = async (post: PostData) => {
  try {
    const firebaseImage = await uploadImageToFirebase(post.imageURL);
    console.log("firebaseImage", firebaseImage);
    if (firebaseImage === "ERROR") return;
    const postImageDownloadUrl = await getDownloadUrl(firebaseImage);
    const postWithImageData = {
      ...post,
      imageURL: postImageDownloadUrl,
    };
    const docRef = await addDoc(collection(db, "posts"), postWithImageData);
    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.log("Error adding document", e);
  }
};

export const getAllPosts = async () => {
  const queryResult = await getDocs(collection(db, "posts"));
  return queryResult.docs.map((doc) => {
    console.log(doc.data());
    return { ...doc.data(), id: doc.id } as PostData;
  });
};

export const getPostById = async (id: string) => {
  const specificPost = await getDoc(doc(db, "posts", id));
  console.log("post by spesific id", specificPost.data());
  return {
    ...specificPost.data(),
    id: specificPost.id,
  } as PostData;
};

export const deletePostById = async (id: string) => {
  try {
    await deleteDoc(doc(db, "posts", id));
    console.log("Document successfully deleted");
  } catch (e) {
    console.log("Error removing document", e);
  }
};
