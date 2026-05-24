import * as Haptics from 'expo-haptics';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadow } from '../theme';

const ITRADE_LOGO = require('../../assets/scotiabank-public/scotia-itrade-logo.png');

// App Store link for Scotia iTRADE
const ITRADE_APP_STORE = 'https://apps.apple.com/ca/app/scotia-itrade/id386638014';

const money = (n: number) =>
  '$' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export function NoTradeScreen({
  pct = 5,
  onBack,
  onDownload,
}: {
  pct?: number;
  onBack?: () => void;
  onDownload?: () => void;
}) {
  const insets = useSafeAreaInsets();
  const deposit = Math.round((1240 * pct) / 100);

  const handleDownload = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(ITRADE_APP_STORE);
    onDownload?.();
  };

  return (
    <View style={styles.root}>
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.handle} />

        <View style={styles.topBar}>
          <Pressable
            onPress={onBack}
            hitSlop={12}
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.45 }]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.backArrow}>‹</Text>
            <Text style={styles.backLabel}>Back</Text>
          </Pressable>
        </View>

        <Image source={ITRADE_LOGO} style={styles.logo} resizeMode="contain" />

        <Text style={styles.headline}>One more step</Text>
        <Text style={styles.sub}>
          Your investments will live in Scotia iTRADE. Download the app and your deposits will start automatically.
        </Text>

        {/* Plan recap */}
        <View style={styles.plan}>
          <View style={styles.planRow}>
            <Text style={styles.planLabel}>Your commitment</Text>
            <Text style={styles.planVal}>{pct}% per paycheque</Text>
          </View>
          <View style={styles.planRow}>
            <Text style={styles.planLabel}>Every 2 weeks</Text>
            <Text style={styles.planVal}>{money(deposit)}</Text>
          </View>
        </View>

        <Pressable
          onPress={handleDownload}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          accessibilityRole="button"
          accessibilityLabel="Download Scotia iTRADE"
        >
          <Text style={styles.ctaText}>Download Scotia iTRADE</Text>
        </Pressable>

        <Text style={styles.helper}>Free on the App Store.</Text>
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
    ...shadow.sheet,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.gray300,
    marginBottom: 4,
  },
  topBar: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  backArrow: {
    fontSize: 28,
    lineHeight: 32,
    color: colors.linkBlue,
    fontFamily: fonts.regular,
    marginTop: -2,
  },
  backLabel: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: colors.linkBlue,
  },

  logo: {
    height: 22,
    width: 148,
    alignSelf: 'center',
    marginBottom: 16,
  },
  headline: {
    fontFamily: fonts.bold,
    fontSize: 19,
    letterSpacing: -0.3,
    color: colors.inkStrong,
    textAlign: 'center',
  },
  sub: {
    marginTop: 6,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    color: colors.gray600,
    textAlign: 'center',
    paddingHorizontal: 8,
  },

  plan: {
    marginTop: 16,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 6,
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planLabel: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.gray600,
  },
  planVal: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.inkStrong,
  },

  cta: {
    height: 56,
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
    fontSize: 15.5,
  },
  helper: {
    marginTop: 8,
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.gray500,
    textAlign: 'center',
  },
});
