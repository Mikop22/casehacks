import { Image, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

// Blurred Scotia app home, shared by all onboarding sheets.
const APP_BACKDROP = require('../../assets/reference/scotia-app-bg.jpg');

export function Backdrop() {
  return (
    <>
      <Image source={APP_BACKDROP} style={styles.image} resizeMode="cover" />
      <BlurView intensity={14} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.scrim} pointerEvents="none" />
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(26,25,25,0.08)',
  },
});
