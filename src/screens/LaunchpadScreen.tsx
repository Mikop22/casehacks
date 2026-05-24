import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadow, space } from '../theme';

const APP_BACKDROP = require('../../assets/reference/scotia-app-bg.jpg');

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
      {/* ── Blurred app backdrop ── */}
      <Image source={APP_BACKDROP} style={styles.backdrop} resizeMode="cover" />
      <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.scrim} pointerEvents="none" />

      {/* ── Main content sheet ── */}
      <View style={[styles.sheet, { paddingBottom: insets.bottom + space.sm }]}>
        <View style={styles.handle} />

        {/* Product heading — not the full Scotiabank wordmark */}
        <Text style={styles.productName}>Launchpad</Text>
        <Text style={styles.eyebrow}>by Scotia iTRADE</Text>

        {/* Referral context — reframed as a Scotia-native pattern */}
        <View style={styles.referralRow}>
          <View style={styles.referralDot} />
          <Text style={styles.referralText}>
            Referred by Mikhai · Preferred Package member
          </Text>
        </View>

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
          onPress={onStart}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          accessibilityRole="button"
          accessibilityLabel="Start my Launchpad"
        >
          <Text style={styles.ctaText}>Start my Launchpad</Text>
        </Pressable>

        <Pressable
          onPress={onLearnMore}
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
    backgroundColor: colors.canvas,
    justifyContent: 'flex-end',
  },
  backdrop: {
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
    backgroundColor: 'rgba(26,25,25,0.12)',
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
  productName: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.inkStrong,
    letterSpacing: -0.3,
  },
  eyebrow: {
    marginTop: 2,
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.gray500,
  },

  // ── Referral row (Scotia-native pattern, not a social chip) ──
  referralRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: space.sm,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
  },
  referralDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.red,
  },
  referralText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.ink,
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
    borderRadius: radius.pill,
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
    fontSize: 13,
    color: colors.linkBlue,
  },
});
