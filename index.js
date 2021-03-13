import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { WEB_URL } from "@env"
import config from "./src/constants/config";
import * as Updates from 'expo-updates';

export default function Index() {

    useEffect(() => {
        // alert("success")
        Updates.checkForUpdateAsync().then((update) => {
            if (update.isAvailable) {
                Alert.alert(
                    "Updates Avilable",
                    "Do you want update?",
                    [
                        {
                            text: "Cancel",

                            style: "cancel"
                        },
                        {
                            text: "OK", onPress: () => {
                                Updates.fetchUpdateAsync();
                                Updates.reloadAsync()
                            }
                            , style: "cancel"
                        }
                    ],
                    { cancelable: false }
                );
            }
        });
    }, [])

    const webUrl = WEB_URL !== undefined ? WEB_URL : "https://centrum.b4a.app"
    console.log(config.apiHost)
    return (
        <WebView source={{ uri: webUrl }} style={styles.container} >
            <StatusBar backgroundColor="#663399" style="light" />
        </WebView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
});
