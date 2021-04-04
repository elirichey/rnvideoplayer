import React from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import VideoPlayer from './VideoPlayer';

export default function App(props) {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <VideoPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000',
  },
});
