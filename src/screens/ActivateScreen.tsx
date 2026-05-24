import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadow } from '../theme';

const ACCOUNTS = [
  { id: 'tfsa', label: 'TFSA', last4: '4821' },
  { id: 'fhsa', label: 'FHSA', last4: '9140' },
  { id: 'rrsp', label: 'RRSP', last4: '3055' },
] as const;

type AccountId = (typeof ACCOUNTS)[number]['id'];

const PAYCHEQUE = 1240;
const NUM_DEPOSITS = 6;
const BONUS_CAP = 500;

const money = (n: number) =>
  '$' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export function ActivateScreen({
  pct = 5,
  onBack,
  onActivate,
}: {
  pct?: number;
  onBack?: () => void;
  onActivate?: (accountId: AccountId) => void;
}) {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<AccountId>('tfsa');
  const [open, setOpen] = useState(false);

  const deposit = Math.round((PAYCHEQUE * pct) / 100);
  const threeMonths = deposit * NUM_DEPOSITS;
  const bonusEstimate = Math.min(threeMonths, BONUS_CAP);
  const selectedAccount = ACCOUNTS.find((a) => a.id === selected)!;

  return (
    <View style={styles.root}>
      <View style={styles.layer}>
        <View style={{ height: insets.top + 30 }} />

        <View style={styles.sheet}>
          {/* Handle pill */}
          <View style={styles.handle} />

          {/* Back button */}
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

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.headline}>Choose where it goes</Text>
            <Text style={styles.sub}>
              We'll deposit {pct}% of each paycheque into your selected Scotia{' '}iTRADE account.
            </Text>

            {/* Account dropdown */}
            <Text style={styles.sectionLabel}>Deposit into</Text>
            <View style={styles.dropdown}>
              {/* Selected row — always visible */}
              <Pressable
                onPress={() => setOpen((o) => !o)}
                style={({ pressed }) => [styles.dropdownSelected, pressed && { opacity: 0.7 }]}
                accessibilityRole="button"
                accessibilityLabel={`Selected account: ${selectedAccount.label} ending in ${selectedAccount.last4}. Tap to change.`}
                accessibilityState={{ expanded: open }}
              >
                <View style={styles.accountInfo}>
                  <Text style={styles.accountLabel}>{selectedAccount.label}</Text>
                  <Text style={styles.accountMask}>•••• {selectedAccount.last4}</Text>
                </View>
                <Text style={[styles.chevron, open && styles.chevronOpen]}>›</Text>
              </Pressable>

              {/* Options — visible when open */}
              {open && (
                <View style={styles.dropdownOptions}>
                  <View style={styles.optionDivider} />
                  {ACCOUNTS.filter((a) => a.id !== selected).map((acct, i, arr) => (
                    <View key={acct.id}>
                      <Pressable
                        onPress={() => { setSelected(acct.id); setOpen(false); }}
                        style={({ pressed }) => [styles.option, pressed && { backgroundColor: colors.surface }]}
                        accessibilityRole="menuitem"
                        accessibilityLabel={`${acct.label} ending in ${acct.last4}`}
                      >
                        <Text style={styles.optionLabel}>{acct.label}</Text>
                        <Text style={styles.optionMask}>•••• {acct.last4}</Text>
                      </Pressable>
                      {i < arr.length - 1 && <View style={styles.optionDivider} />}
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Confirmation summary */}
            <View style={styles.confirm}>
              <View style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Amount</Text>
                <Text style={styles.rowValue}>{pct}% per paycheque</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Deposit</Text>
                <Text style={styles.rowValue}>{money(deposit)} every 2 weeks</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Destination</Text>
                <Text style={styles.rowValue}>
                  iTRADE {selectedAccount.label} ···· {selectedAccount.last4}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Bonus estimate</Text>
                <Text style={styles.rowValueBonus}>+{money(bonusEstimate)}</Text>
              </View>
            </View>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: insets.bottom + 2 }]}>
            <Pressable
              onPress={() => onActivate?.(selected)}
              style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
              accessibilityRole="button"
              accessibilityLabel="Activate Launchpad"
            >
              <Text style={styles.ctaText}>Activate Launchpad</Text>
            </Pressable>
            <Text style={styles.helper}>You can change this later.</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  layer: { flex: 1 },
  sheet: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 28,
    paddingTop: 12,
    ...shadow.sheet,
  },

  // ── Top bar ──
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
    alignItems: 'center',
    marginBottom: 4,
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

  // ── Scroll ──
  scroll: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 4,
    paddingBottom: 8,
  },

  // ── Header ──
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
    paddingHorizontal: 12,
  },

  // ── Dropdown ──
  sectionLabel: {
    marginTop: 16,
    marginBottom: 8,
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.gray700,
  },
  dropdown: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
    overflow: 'hidden',
    ...shadow.card,
  },
  dropdownSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  accountInfo: { flex: 1 },
  accountLabel: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.inkStrong,
  },
  accountMask: {
    marginTop: 2,
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.gray500,
  },
  chevron: {
    fontSize: 22,
    lineHeight: 26,
    color: colors.gray400,
    fontFamily: fonts.regular,
    transform: [{ rotate: '90deg' }],
  },
  chevronOpen: {
    transform: [{ rotate: '-90deg' }],
  },
  dropdownOptions: {},
  optionDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  option: {
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  optionLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.inkStrong,
  },
  optionMask: {
    marginTop: 2,
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.gray500,
  },

  // ── Confirmation ──
  confirm: {
    marginTop: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: 14,
    ...shadow.card,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 3,
  },
  rowLabel: {
    fontFamily: fonts.regular,
    fontSize: 13.5,
    color: colors.gray600,
  },
  rowValue: {
    fontFamily: fonts.semibold,
    fontSize: 13.5,
    color: colors.inkStrong,
  },
  rowValueBonus: {
    fontFamily: fonts.bold,
    fontSize: 13.5,
    color: colors.red,
  },

  // ── Footer ──
  footer: { paddingTop: 12 },
  cta: {
    height: 56,
    borderRadius: radius.sm,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
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
