import MapView, { Callout, Marker } from "react-native-maps";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { PostData } from "@/utils/postData";
import { useEffect, useState } from "react";
import { getData } from "@/utils/local_storage";
import { router } from "expo-router";

export default function PostsMapPage() {
  const [posts, setPosts] = useState<PostData[]>([]);

  const getPostsFromLocal = async () => {
    const posts = await getData("posts");
    if (posts) {
      setPosts(JSON.parse(posts));
    }
  };

  useEffect(() => {
    getPostsFromLocal();
  }, []);

  return (
    <View>
      <MapView
        initialRegion={{
          latitude: 59.914305,
          longitude: 10.723951,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {posts.length > 0 &&
          posts.map((post) => (
            <Marker
              coordinate={{
                latitude: post.postCoordinates?.latitude ?? 0,
                longitude: post.postCoordinates?.longitude ?? 0,
              }}
              key={post.id}
            >
              <Callout>
                <Pressable
                  onPress={() => {
                    router.navigate({
                      pathname: "/postDetails/[id]",
                      params: { id: post.id },
                    });
                  }}
                >
                  <View>
                    <View>
                      {post.imageURL ? (
                        <Image
                          style={styles.image}
                          source={{ uri: post.imageURL }}
                        />
                      ) : (
                        <View style={styles.placeholder}>
                          <Text>No Image Available</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.title}>{post?.title}</Text>
                    <Text style={styles.description}>{post?.description}</Text>
                  </View>
                </Pressable>
              </Callout>
            </Marker>
          ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  callout: {
    width: 200,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    color: "gray",
  },
  placeholder: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
});
