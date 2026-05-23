import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScotiaWordmark } from '../components/ScotiaLogo';
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
      <Image source={APP_BACKDROP} style={styles.backdrop} resizeMode="cover" />
      <BlurView intensity={32} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.scrim} pointerEvents="none" />

      <View style={[styles.sheet, { paddingBottom: insets.bottom + space.lg }]}>
        <View style={styles.handle} />

        <ScotiaWordmark height={22} />
        <Text style={styles.eyebrow}>LAUNCHPAD · POWERED BY SCOTIA iTRADE</Text>

        <View style={styles.creatorChip}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <Text style={styles.creatorText}>Mikhai invited you</Text>
        </View>

        <Text style={styles.title}>Start your investing habit</Text>

        <View style={styles.bonus}>
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

        <Pressable onPress={onLearnMore} style={styles.link} accessibilityRole="link">
          <Text style={styles.linkText}>See how the $500 bonus works</Text>
        </Pressable>
      </View>
    </View>
  );
}

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
    backgroundColor: 'rgba(26,25,25,0.08)',
  },

  // Sheet
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: space.lg + 4,
    paddingTop: space.sm,
    alignItems: 'center',
    ...shadow.cta,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.gray300,
    marginBottom: space.lg,
  },
  eyebrow: {
    marginTop: 8,
    fontFamily: fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.4,
    color: colors.gray500,
  },

  creatorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingLeft: 6,
    paddingRight: 14,
    marginTop: space.lg,
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.inkStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 12,
  },
  creatorText: {
    fontFamily: fonts.semibold,
    fontSize: 13.5,
    color: colors.ink,
  },

  title: {
    marginTop: space.md,
    fontFamily: fonts.bold,
    fontSize: 19,
    color: colors.inkStrong,
    letterSpacing: -0.2,
    textAlign: 'center',
  },

  bonus: {
    alignItems: 'center',
    marginTop: space.md,
  },
  bonusKicker: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    color: colors.gray500,
    letterSpacing: 1.8,
  },
  bonusAmount: {
    fontFamily: fonts.extrabold,
    fontSize: 38,
    lineHeight: 44,
    color: colors.red,
    letterSpacing: -0.6,
    marginTop: 3,
  },
  bonusCaption: {
    fontFamily: fonts.medium,
    fontSize: 13.5,
    color: colors.gray600,
    marginTop: 2,
  },

  cta: {
    alignSelf: 'stretch',
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: space.lg,
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
  link: {
    paddingVertical: 12,
    marginTop: 2,
  },
  linkText: {
    fontFamily: fonts.semibold,
    fontSize: 13.5,
    color: colors.linkBlue,
  },
});
