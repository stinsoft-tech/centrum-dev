import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { WEB_URL } from "@env"

export default function App() {
  const webUrl = WEB_URL !== undefined ? WEB_URL : "https://centrum.b4a.app"
  return (
    <WebView source={{ uri: webUrl }} style={{ marginTop: 20 }} >
      <StatusBar backgroundColor="#663399" style="light" />
    </WebView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',s
//     justifyContent: 'center',
//   },
// });
