import { LocationObjectCoords } from "expo-location";

export interface PostData {
  title: string;
  description: string;
  imageURL: string;
  id: string;
  isLiked: boolean;
  hashtags: string;
  author: string;
  postCoordinates: LocationObjectCoords | null;
}
