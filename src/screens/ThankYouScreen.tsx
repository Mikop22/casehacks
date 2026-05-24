import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadow } from '../theme';

const money = (n: number) =>
  '$' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export function ThankYouScreen({
  pct = 5,
  onDone,
}: {
  pct?: number;
  onDone?: () => void;
}) {
  const insets = useSafeAreaInsets();
  const deposit = Math.round((1240 * pct) / 100);

  return (
    <View style={styles.root}>
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.handle} />

        <View style={styles.check}>
          <Text style={styles.checkMark}>✓</Text>
        </View>

        <Text style={styles.headline}>Almost there</Text>
        <Text style={styles.sub}>
          Open an investment account in Scotia iTRADE to complete your setup. Once it's ready, your {pct}% deposits — {money(deposit)} every 2 weeks — will start automatically.
        </Text>

        <Pressable
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); onDone?.(); }}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          accessibilityRole="button"
          accessibilityLabel="Done"
        >
          <Text style={styles.ctaText}>Done</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 28,
    paddingTop: 12,
    alignItems: 'center',
    ...shadow.sheet,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.gray300,
    marginBottom: 24,
  },

  check: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  checkMark: {
    fontSize: 26,
    color: colors.white,
    lineHeight: 32,
  },

  headline: {
    fontFamily: fonts.bold,
    fontSize: 21,
    letterSpacing: -0.3,
    color: colors.inkStrong,
    textAlign: 'center',
  },
  sub: {
    marginTop: 8,
    fontFamily: fonts.regular,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.gray600,
    textAlign: 'center',
    paddingHorizontal: 8,
  },

  cta: {
    alignSelf: 'stretch',
    height: 56,
    borderRadius: radius.sm,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  ctaPressed: {
    backgroundColor: colors.redHover,
    transform: [{ scale: 0.985 }],
  },
  ctaText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 15.5,
  },
});
