import { useAuthSession } from "@/providers/authctx";
import { storeData } from "@/utils/local_storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

const Authentication = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isSignedUp, setIsSignedUp] = useState(false);

  const { signIn } = useAuthSession();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0d2136",
      }}
    >
      <View style={styles.mainContainer}>
        {isSignedUp && (
          <View style={styles.textFieldContainer}>
            <Text style={styles.text}>Brukernavn</Text>
            <TextInput
              value={userName}
              onChangeText={setUserName}
              style={styles.textField}
              placeholder="Brukenavn"
            />
          </View>
        )}
        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Epost</Text>
          <TextInput
            value={userEmail}
            onChangeText={setUserEmail}
            style={styles.textField}
            placeholder="Epost"
          />
        </View>
        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Passord</Text>
          <TextInput
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.textField}
            placeholder="Passord"
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
        <Pressable
          style={{
            paddingTop: 10,
          }}
          onPress={() => {
            setIsSignedUp(true);
          }}
        >
          <Text style={{ textDecorationLine: "underline", color: "white" }}>
            Lag bruker
          </Text>
        </Pressable>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => {
              // createUserName(userName);
              if (!userEmail || !password) {
                setError("Fyll ut alle feltene");
                setTimeout(() => {
                  setError("");
                }, 5000);
                return;
              } else {
                setError("");
                signIn(userEmail, password);
              }
            }}
          >
            <Text style={styles.text}>Lag bruker</Text>
          </Pressable>
          {isSignedUp && (
            <Pressable
              style={styles.primaryButton}
              onPress={() => setIsSignedUp(false)}
            >
              <Text style={{ color: "white" }}>Avbryt</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 77,
    paddingTop: 22,
  },
  primaryButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: "#0096C7",
    color: "#f1f3f4",
  },
  secondaryButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "gray",
  },
  textFieldContainer: {
    width: "100%",
    paddingTop: 16,
    maxWidth: 200,
  },
  textField: {
    borderWidth: 1,
    padding: 10,
    marginTop: 2,
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "#f1f3f4",
  },
  text: {
    color: "#f1f3f4",
  },
  errorText: {
    color: "red",
  },
});
