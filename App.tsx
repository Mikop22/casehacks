import { useCallback, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  SourceSans3_400Regular,
  SourceSans3_500Medium,
  SourceSans3_600SemiBold,
  SourceSans3_700Bold,
  SourceSans3_800ExtraBold,
} from '@expo-google-fonts/source-sans-3';
import { Backdrop } from './src/components/Backdrop';
import { LaunchpadScreen } from './src/screens/LaunchpadScreen';
import { CommitScreen } from './src/screens/CommitScreen';
import { BonusExplanationScreen } from './src/screens/BonusExplanationScreen';
import { ActivateScreen } from './src/screens/ActivateScreen';

type Screen = 'launchpad' | 'commit' | 'bonus' | 'activate';

const SCREEN_H = Dimensions.get('window').height;
const EXIT_MS = 280;

export default function App() {
  const [current, setCurrent] = useState<Screen>('launchpad');
  const [next, setNext] = useState<Screen | null>(null);
  const [commitPct, setCommitPct] = useState(5);

  // Outgoing sheet: 1 → 0 (slide down + fade)
  const outAnim = useRef(new Animated.Value(1)).current;
  // Incoming sheet: 0 → 1 (slide up + fade in)
  const inAnim = useRef(new Animated.Value(1)).current;

  const transitioning = useRef(false);

  const [fontsLoaded] = useFonts({
    SourceSans3_400Regular,
    SourceSans3_500Medium,
    SourceSans3_600SemiBold,
    SourceSans3_700Bold,
    SourceSans3_800ExtraBold,
  });

  const navigate = useCallback(
    (to: Screen) => {
      if (transitioning.current || to === current) return;
      transitioning.current = true;

      setNext(to);
      outAnim.setValue(1);
      inAnim.setValue(0);

      Animated.sequence([
        // Phase 1: outgoing sheet slides down + fades
        Animated.timing(outAnim, {
          toValue: 0,
          duration: EXIT_MS,
          useNativeDriver: true,
        }),
        // Phase 2: incoming sheet springs up naturally
        Animated.spring(inAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 18,
          stiffness: 90,
          mass: 1,
        }),
      ]).start(() => {
        setCurrent(to);
        setNext(null);
        outAnim.setValue(1);
        inAnim.setValue(1);
        transitioning.current = false;
      });
    },
    [current, outAnim, inAnim],
  );

  if (!fontsLoaded) {
    return null;
  }

  const outStyle = {
    opacity: outAnim,
    transform: [
      {
        translateY: outAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [SCREEN_H * 0.18, 0],
        }),
      },
    ],
  };

  const inStyle = {
    opacity: inAnim,
    transform: [
      {
        translateY: inAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [SCREEN_H * 0.22, 0],
        }),
      },
    ],
  };

  const renderScreen = (screen: Screen) => {
    switch (screen) {
      case 'launchpad':
        return (
          <LaunchpadScreen
            onStart={() => navigate('commit')}
            onLearnMore={() => navigate('bonus')}
          />
        );
      case 'commit':
        return (
          <CommitScreen
            onContinue={(pct) => {
              setCommitPct(pct);
              navigate('activate');
            }}
          />
        );
      case 'bonus':
        return <BonusExplanationScreen onBack={() => navigate('launchpad')} />;
      case 'activate':
        return (
          <ActivateScreen
            pct={commitPct}
            onBack={() => navigate('commit')}
            onActivate={() => navigate('launchpad')}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />

      {/* Static backdrop — never animates */}
      <View style={styles.backdrop}>
        <Backdrop />
      </View>

      {/* Incoming sheet (behind, animating in) */}
      {next && (
        <Animated.View style={[styles.layer, inStyle]} pointerEvents="auto">
          {renderScreen(next)}
        </Animated.View>
      )}

      {/* Current/outgoing sheet (on top) */}
      <Animated.View
        style={[styles.layer, next ? outStyle : undefined]}
        pointerEvents={next ? 'none' : 'auto'}
      >
        {renderScreen(current)}
      </Animated.View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
