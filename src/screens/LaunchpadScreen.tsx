import * as Haptics from 'expo-haptics';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadow, space } from '../theme';

const ITRADE_LOGO = require('../../assets/scotiabank-public/scotia-itrade-logo.png');

export function LaunchpadScreen({
  onStart,
  onLearnMore,
}: {
  onStart?: () => void;
  onLearnMore?: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      {/* ── Main content sheet ── */}
      <View style={[styles.sheet, { paddingBottom: insets.bottom + space.sm }]}>
        <View style={styles.handle} />

        <Image source={ITRADE_LOGO} style={styles.logo} resizeMode="contain" />
        <Text style={styles.eyebrow}>Powered by Scotiabank</Text>

        <Text style={styles.title}>Start your investing habit</Text>

        {/* Bonus block — $500 in charcoal, NOT red, so CTA stays the sole red element */}
        <View
          style={styles.bonus}
          accessible
          accessibilityLabel="Earn up to 500 dollars in matched investments"
        >
          <Text style={styles.bonusKicker}>EARN UP TO</Text>
          <Text style={styles.bonusAmount}>$500</Text>
          <Text style={styles.bonusCaption}>in matched investments</Text>
        </View>

        <Pressable
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); onStart?.(); }}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          accessibilityRole="button"
          accessibilityLabel="Get started"
        >
          <Text style={styles.ctaText}>Get started</Text>
        </Pressable>

        <Pressable
          onPress={() => { Haptics.selectionAsync(); onLearnMore?.(); }}
          style={styles.link}
          accessibilityRole="link"
          accessibilityLabel="See how the 500 dollar bonus works"
        >
          <Text style={styles.linkText}>See how the $500 bonus works →</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  // ── Sheet ──
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: 24,
    paddingTop: space.xs,
    alignItems: 'center',
    ...shadow.sheet,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gray300,
    marginBottom: space.sm + 4,
  },

  // ── Product identity ──
  logo: {
    height: 24,
    width: 160,
    marginTop: 4,
  },
  eyebrow: {
    marginTop: 8,
    fontFamily: fonts.medium,
    fontSize: 10,
    color: colors.gray500,
  },

  // ── Title ──
  title: {
    marginTop: space.sm,
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.inkStrong,
    letterSpacing: -0.2,
    textAlign: 'center',
  },

  // ── Bonus ──
  bonus: {
    alignItems: 'center',
    marginTop: space.sm,
  },
  bonusKicker: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    color: colors.gray500,
    letterSpacing: 1.6,
  },
  bonusAmount: {
    fontFamily: fonts.extrabold,
    fontSize: 42,
    lineHeight: 48,
    color: colors.inkStrong, // Charcoal, NOT red — CTA is the sole red element
    letterSpacing: -0.8,
    marginTop: 2,
  },
  bonusCaption: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.gray600,
    marginTop: 2,
  },

  // ── CTA ──
  cta: {
    alignSelf: 'stretch',
    height: 52,
    borderRadius: radius.sm,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  ctaPressed: {
    backgroundColor: colors.redHover,
    transform: [{ scale: 0.985 }],
  },
  ctaText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 15,
  },

  // ── Link ──
  link: {
    paddingVertical: 10,
    marginTop: 2,
  },
  linkText: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    color: colors.linkBlue,
  },
});
