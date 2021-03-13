import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Alert, View, TouchableHighlight, Text, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { WEB_URL } from "@env";
import { Colors } from './app/helpers/Colors';
import * as Updates from 'expo-updates';
import Constants from 'expo-constants';
import { APP_VERSION } from "./app/constants/app-version";
import Loader from './app/components/loader';

export default function App() {
  const webUrl = WEB_URL !== undefined ? WEB_URL : "https://centrum.b4a.app"
  const isProd = !Constants.manifest.packagerOpts.dev;
  const [visible, setVisible] = useState(false);

  useEffect(() =>{
    isUpdateAvailable();
  })

    async function isUpdateAvailable() {
      const updateAvailable = await Updates.checkForUpdateAsync();
      console.log(updateAvailable.isAvailable);
      if (updateAvailable.isAvailable) {
        Alert.alert(
          "Update Available",
          "An update is available.",
          [{
            text: "OK",
            onPress: () => {
              async () => {
                await Updates.fetchUpdateAsync();
                Updates.reloadFromCache();
              }
            }
          }], {
            cancelable: false
          }
        );
      }
    }
  

   const onLongPressDev = () => {
      Alert.alert(
        "Developer Menu",
        `Release Channel: DEV\nJS App Version: ${APP_VERSION}\nNative App Version: ${
          Platform.OS === "ios" ? Constants.nativeAppVersion : Constants.expoVersion
        } (${Constants.nativeBuildVersion})\n`,
        [
          {
            text: "Update App",
            onPress: async () => {
              isUpdateAvailable();
            }
          },
          {
            text: "Cancel"
          }
        ],
        { cancelable: true }
      );
    };
   

  return (
    <>
      <SafeAreaView style={styles.safeViewBG}></SafeAreaView>
      <StatusBar backgroundColor={Colors.Primary} style="light" />
        <WebView
          source={{ uri: webUrl }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          renderLoading={() => <Loader />}
          style={styles.container}
        ></WebView>
      {isProd ? null : (
        <View>
          <TouchableHighlight
            style={styles.devButton}
            onLongPress={onLongPressDev}
          >
            <Text>{"DEV"}</Text>
          </TouchableHighlight>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  safeViewBG:{
    backgroundColor: Colors.Primary
  },
  container: {
    flex: 1,
    backgroundColor: Colors.LightGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  devButton:{
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: Colors.White,
    padding: 10,
    opacity: 0.8,
    borderColor: Colors.LightGrey,
    borderWidth: 0.5,
    borderRadius: 3
  }
});
