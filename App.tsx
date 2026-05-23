import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';
import { LaunchpadScreen } from './src/screens/LaunchpadScreen';
import { BonusExplanationScreen } from './src/screens/BonusExplanationScreen';

type Screen = 'launchpad' | 'bonus';

export default function App() {
  const [screen, setScreen] = useState<Screen>('launchpad');

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {screen === 'launchpad' && (
        <LaunchpadScreen
          onStart={() => {}}
          onLearnMore={() => setScreen('bonus')}
        />
      )}
      {screen === 'bonus' && (
        <BonusExplanationScreen onBack={() => setScreen('launchpad')} />
      )}
    </SafeAreaProvider>
  );
}
