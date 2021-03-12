import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { WEB_URL } from "@env";
import { Colors } from './app/helpers/Colors';
import * as Updates from 'expo-updates';

export default function App() {
  const webUrl = WEB_URL !== undefined ? WEB_URL : "https://centrum.b4a.app"

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
  

  return (
    <>
    <SafeAreaView style={styles.safeViewBG}></SafeAreaView>
      <StatusBar backgroundColor={Colors.Primary} style="light" />
      <WebView source={{ uri: webUrl }} 
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.container} >
      </WebView>
    </>
  );
}

const styles = StyleSheet.create({
  safeViewBG:{
    backgroundColor: Colors.Primary
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
