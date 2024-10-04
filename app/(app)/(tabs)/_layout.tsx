import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text } from "react-native";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            // Ikon hentet fra https://icons.expo.fyi/Index, en ikondatabase for expo. Prøv dere fram med egne ikoner ved å følge lenken!
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="PostsMapPage"
        options={{
          title: "PostsMap",
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="map" size={24} color={color} />
          ),
          headerTitle(props) {
            return (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Kartside
              </Text>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
          headerTitle(props) {
            return (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Profilside
              </Text>
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
