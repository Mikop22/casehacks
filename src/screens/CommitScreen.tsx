import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PercentSlider } from '../components/PercentSlider';
import { colors, fonts, radius, shadow } from '../theme';

const PAYCHEQUE = 1240;
const STOPS = [1, 3, 5, 7, 10];
const NUM_DEPOSITS = 6;
const BONUS_CAP = 500;

const money = (n: number) =>
  '$' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export function CommitScreen({
  onContinue,
}: {
  onContinue?: (pct: number) => void;
}) {
  const insets = useSafeAreaInsets();
  const [pct, setPct] = useState(5);

  const deposit = Math.round((PAYCHEQUE * pct) / 100);
  const fromYou = deposit * NUM_DEPOSITS;
  const fromScotia = Math.min(fromYou, BONUS_CAP);
  const total = fromYou + fromScotia;

  return (
    <View style={styles.root}>
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.handle} />

        <Text style={styles.headline}>Choose how much to invest</Text>
        <Text style={styles.sub}>
          We'll automatically deposit this amount into Scotia{' '}iTRADE from each paycheque.
        </Text>

        <View style={styles.payroll}>
          <View style={styles.payrollText}>
            <Text style={styles.payrollLabel}>Based on your usual biweekly paycheque</Text>
            <Text style={styles.payrollAmount}>{money(PAYCHEQUE)}</Text>
          </View>
          <Pressable hitSlop={10}>
            <Text style={styles.editLink}>Edit</Text>
          </Pressable>
        </View>

        <View style={styles.selector}>
          <Text style={styles.depositAmount}>{money(deposit)}</Text>
          <Text style={styles.depositSub}>every 2 weeks</Text>
        </View>

        <View style={styles.sliderWrap}>
          <PercentSlider stops={STOPS} value={pct} onChange={setPct} />
        </View>

        <View style={styles.estimate}>
          <Text style={styles.estimateTitle}>After 3 months you'll have invested</Text>
          <Text style={styles.estimateTotal}>{money(total)}</Text>

          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>From you</Text>
            <Text style={styles.rowValue}>{money(fromYou)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>From Scotia</Text>
            <Text style={styles.rowValuePlus}>+{money(fromScotia)}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); onContinue?.(pct); }}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          accessibilityRole="button"
          accessibilityLabel={`Continue with ${pct} percent`}
        >
          <Text style={styles.ctaText}>Continue with {pct}%</Text>
        </Pressable>
        <Text style={styles.helper}>You can change this later.</Text>
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
    marginBottom: 16,
  },

  headline: {
    fontFamily: fonts.bold,
    fontSize: 21,
    letterSpacing: -0.3,
    color: colors.inkStrong,
    textAlign: 'center',
  },
  sub: {
    marginTop: 6,
    fontFamily: fonts.regular,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.gray600,
    textAlign: 'center',
    paddingHorizontal: 12,
  },

  payroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 14,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  payrollText: {
    flex: 1,
    minWidth: 0,
  },
  payrollLabel: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.gray500,
  },
  payrollAmount: {
    marginTop: 2,
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.inkStrong,
  },
  editLink: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.linkBlue,
  },

  selector: {
    alignItems: 'center',
    marginTop: 18,
  },
  depositAmount: {
    fontFamily: fonts.bold,
    fontSize: 46,
    lineHeight: 52,
    letterSpacing: -1,
    color: colors.inkStrong,
  },
  depositSub: {
    marginTop: 2,
    fontFamily: fonts.medium,
    fontSize: 13.5,
    color: colors.gray600,
  },

  sliderWrap: {
    marginTop: 14,
  },

  estimate: {
    marginTop: 14,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: 16,
    ...shadow.card,
  },
  estimateTitle: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.gray600,
    textAlign: 'center',
  },
  estimateTotal: {
    marginTop: 4,
    fontFamily: fonts.bold,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: -0.8,
    color: colors.inkStrong,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 4,
  },
  rowLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.gray700,
  },
  rowValue: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.inkStrong,
  },
  rowValuePlus: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.red,
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
