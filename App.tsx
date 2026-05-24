import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';
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
import { NoTradeScreen } from './src/screens/NoTradeScreen';
import { ThankYouScreen } from './src/screens/ThankYouScreen';

type Screen = 'launchpad' | 'commit' | 'bonus' | 'activate' | 'no-trade' | 'thankyou';

const SCREEN_H = Dimensions.get('window').height;

// How far the outgoing sheet drops (subtle — just enough to feel dismissed)
const OUT_Y = SCREEN_H * 0.10;
// How far the incoming sheet rises from below
const IN_Y = SCREEN_H * 0.18;

export default function App() {
  const [current, setCurrent] = useState<Screen>('launchpad');
  const [next, setNext] = useState<Screen | null>(null);
  const [commitPct, setCommitPct] = useState(5);

  const outAnim = useRef(new Animated.Value(1)).current;
  const inAnim  = useRef(new Animated.Value(1)).current;

  // First-load entrance
  const entranceAnim = useRef(new Animated.Value(0)).current;
  const hasEntered   = useRef(false);

  const transitioning = useRef(false);

  const [fontsLoaded] = useFonts({
    SourceSans3_400Regular,
    SourceSans3_500Medium,
    SourceSans3_600SemiBold,
    SourceSans3_700Bold,
    SourceSans3_800ExtraBold,
  });

  // Spring the first screen in once fonts are ready
  useEffect(() => {
    if (!fontsLoaded || hasEntered.current) return;
    hasEntered.current = true;
    Animated.spring(entranceAnim, {
      toValue: 1,
      useNativeDriver: true,
      damping: 22,
      stiffness: 180,
      mass: 1,
    }).start();
  }, [fontsLoaded]);

  const navigate = useCallback(
    (to: Screen) => {
      if (transitioning.current || to === current) return;
      transitioning.current = true;

      setNext(to);
      outAnim.setValue(1);
      inAnim.setValue(0);

      // Exit and entrance run in parallel — exit is fast, entrance springs in
      // slightly behind so the old sheet clears before the new one peaks.
      Animated.parallel([
        // Outgoing: quick ease-in fade + small drop
        Animated.timing(outAnim, {
          toValue: 0,
          duration: 190,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        // Incoming: delayed spring — starts just as outgoing fades
        Animated.sequence([
          Animated.delay(70),
          Animated.spring(inAnim, {
            toValue: 1,
            useNativeDriver: true,
            damping: 24,
            stiffness: 280,
            mass: 1,
          }),
        ]),
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

  if (!fontsLoaded) return null;

  const entranceStyle = {
    opacity: entranceAnim,
    transform: [{
      translateY: entranceAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [IN_Y, 0],
      }),
    }],
  };

  const outStyle = {
    opacity: outAnim,
    transform: [{
      translateY: outAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [OUT_Y, 0],
      }),
    }],
  };

  const inStyle = {
    opacity: inAnim,
    transform: [{
      translateY: inAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [IN_Y, 0],
      }),
    }],
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
            onNoTrade={() => navigate('no-trade')}
          />
        );
      case 'no-trade':
        return (
          <NoTradeScreen
            pct={commitPct}
            onBack={() => navigate('activate')}
            onDownload={() => navigate('thankyou')}
          />
        );
      case 'thankyou':
        return (
          <ThankYouScreen
            pct={commitPct}
            onDone={() => navigate('launchpad')}
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

      {/* Current / outgoing sheet (on top) */}
      <Animated.View
        style={[styles.layer, next ? outStyle : entranceStyle]}
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
    top: 0, left: 0, right: 0, bottom: 0,
  },
  layer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
});
