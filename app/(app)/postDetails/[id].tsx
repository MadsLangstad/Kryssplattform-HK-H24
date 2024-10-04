import { getPostById } from "@/utils/dummyPostData";
import { getPostFromLocalById } from "@/utils/local_storage";
import { PostData } from "@/utils/postData";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as postApi from "@/api/postApi";

export default function postDetails() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<PostData | null>(null);

  // const fetchPostData = async () => {
  //   const post = await getPostFromLocalById(id as string);
  //   if (post) {
  //     setPost(post);
  //   }
  // };

  const fetchPostFromBackend = async () => {
    const post = await postApi.getPostById(id as string);
    if (post) {
      setPost(post);
    }
  };

  useEffect(() => {
    // fetchPostData();
    fetchPostFromBackend();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: (props) => (
            <Text style={styles.headerTitle}>PostDetaljer</Text>
          ),
          headerRight: () => (
            <Pressable
              onPress={async () => {
                await postApi.deletePostById(id as string);
                router.back();
              }}
            >
              <Text style={styles.deleteText}>Slett innlegg</Text>
            </Pressable>
          ),
          headerBackground: () => {
            return (
              <View
                style={{
                  backgroundColor: "#0d2136",
                  height: 100,
                }}
              />
            );
          },
        }}
      />
      {post ? (
        <>
          {/* Image section */}
          <Image
            source={{ uri: post.imageURL }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Post data section */}
          <View style={styles.postDataContainer}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.description}>{post.description}</Text>
            <Text style={styles.hashtags}>{post.hashtags}</Text>
          </View>

          {/* Map section */}
          <View style={styles.mapContainer}>
            <MapView
              zoomEnabled={false}
              scrollEnabled={false}
              rotateEnabled={false}
              pitchEnabled={false}
              initialRegion={{
                latitude: post?.postCoordinates?.latitude ?? 0,
                longitude: post?.postCoordinates?.longitude ?? 0,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0122,
              }}
              showsUserLocation={true}
              style={styles.map}
            >
              <Marker
                coordinate={{
                  latitude: post?.postCoordinates?.latitude ?? 0,
                  longitude: post?.postCoordinates?.longitude ?? 0,
                }}
                key={post.id}
              />
            </MapView>
          </View>
          <View
            style={{
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: 50,
            }}
          >
            {/* <Pressable
              style={styles.deleteBtn}
              onPress={() => {
                postApi.deletePostById(post.id);
                router.navigate("/(tabs)");
              }}
            >
              <Text>Delete Post</Text>
            </Pressable> */}
          </View>
        </>
      ) : (
        <Text>Laster inn data...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0d2136",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  postDataContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f1f3f4",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f1f3f4",
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
    color: "#f1f3f4",
  },
  hashtags: {
    fontSize: 14,
    color: "#f1f3f4",
  },
  mapContainer: {
    width: "100%",
    height: 200,
    marginTop: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  deleteText: {
    color: "white",
  },
});
