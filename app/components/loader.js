import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../helpers/Colors';

export default class Loader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
            style={styles.logo}
            source={
                require('../../assets/logo_white.png')
            }
      />
        <ActivityIndicator color={Colors.Primary} size="large"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    safeViewBG:{
      backgroundColor: Colors.Primary
    },
    logo:{
        width: 230,
        height: 60,
        resizeMode:'contain',
        marginBottom: 5
    },
    container: {
      flex: 1,
      backgroundColor: Colors.LightGrey,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });