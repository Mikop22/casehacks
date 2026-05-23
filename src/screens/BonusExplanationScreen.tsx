import { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, space } from '../theme';

const SCREEN_H = Dimensions.get('window').height;

const TABLE_ROWS = [
  { contribution: 'Up to $249 / mo',  match: '5%',  bonus: 'Up to $50'  },
  { contribution: '$250 – $499 / mo', match: '10%', bonus: 'Up to $100' },
  { contribution: '$500 – $999 / mo', match: '15%', bonus: 'Up to $200' },
  { contribution: '$1,000+ / mo',     match: '25%', bonus: 'Up to $500' },
];

const FAQS = [
  {
    q: 'How do I get this bonus?',
    a: 'Open a Scotia iTRADE account through Launchpad and set up a recurring monthly contribution. Once your first contribution clears, Scotiabank matches it — deposited directly into your iTRADE account.',
  },
  {
    q: 'How is the bonus calculated?',
    a: 'Your bonus is a percentage of what you contribute each month, capped at $500. The higher your monthly deposit, the higher your match rate. Your tier is set on your first qualifying contribution.',
  },
  {
    q: 'What is Scotia iTRADE?',
    a: "Scotia iTRADE is Scotiabank's self-directed investing platform. Buy and hold stocks, ETFs, mutual funds, and more — registered or non-registered, no minimum balance required.",
  },
  {
    q: 'Is this a limited-time offer?',
    a: "Yes. The Launchpad bonus runs for a limited period under Scotiabank's current promotion terms. Full terms available at scotiabank.com/launchpad.",
  },
  {
    q: 'When will I receive the bonus?',
    a: "Matched funds are deposited within 30 business days of your first qualifying contribution. You'll get an in-app notification and email when it lands.",
  },
];

// ── FAQ accordion item ──────────────────────────────────────────────────────

function FaqItem({ q, a, isLast }: { q: string; a: string; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  const [measuredHeight, setMeasuredHeight] = useState(0);

  const toggle = () => {
    Animated.spring(anim, {
      toValue: open ? 0 : 1,
      useNativeDriver: false,
      overshootClamping: true,
      restDisplacementThreshold: 0.5,
      restSpeedThreshold: 0.5,
    }).start();
    setOpen(o => !o);
  };

  const animHeight = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, measuredHeight || 120],
  });

  const answerOpacity = anim.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <View style={[styles.faqItem, !isLast && styles.faqDivider]}>
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [styles.faqRow, pressed && { opacity: 0.55 }]}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={q}
      >
        <Text style={styles.faqQ}>{q}</Text>
        <Text style={styles.faqChevron}>{open ? '−' : '+'}</Text>
      </Pressable>

      <Animated.View style={{ height: animHeight, overflow: 'hidden' }}>
        {/* Invisible render to capture height */}
        <View
          style={styles.faqMeasure}
          onLayout={e => setMeasuredHeight(e.nativeEvent.layout.height)}
        >
          <Animated.Text style={[styles.faqA, { opacity: answerOpacity }]}>
            {a}
          </Animated.Text>
        </View>
      </Animated.View>
    </View>
  );
}

// ── Main screen ─────────────────────────────────────────────────────────────

export function BonusExplanationScreen({ onBack }: { onBack?: () => void }) {
  const insets = useSafeAreaInsets();

  // Scroll tracking (JS-side so addListener fires reliably)
  const scrollY = useRef(new Animated.Value(0)).current;

  // Hero entrance — each element fades + slides up in sequence
  const heroAnims = useRef([0, 1, 2].map(() => new Animated.Value(0))).current;
  const arrowNudge = useRef(new Animated.Value(0)).current;

  // Below-fold section reveals
  const tableAnim = useRef(new Animated.Value(0)).current;
  const faqAnim = useRef(new Animated.Value(0)).current;
  const tableTriggered = useRef(false);
  const faqTriggered = useRef(false);

  useEffect(() => {
    // Staggered hero entrance after a brief settle
    const timeout = setTimeout(() => {
      Animated.stagger(
        120,
        heroAnims.map(a =>
          Animated.spring(a, {
            toValue: 1,
            useNativeDriver: true,
            friction: 9,
            tension: 60,
          }),
        ),
      ).start(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(arrowNudge, { toValue: 6, duration: 600, useNativeDriver: true }),
            Animated.timing(arrowNudge, { toValue: 0, duration: 600, useNativeDriver: true }),
          ]),
        ).start();
      });
    }, 80);

    // Scroll-based section reveals
    const listenerId = scrollY.addListener(({ value }) => {
      if (value > 100 && !tableTriggered.current) {
        tableTriggered.current = true;
        Animated.spring(tableAnim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 9,
          tension: 55,
        }).start();
      }
      if (value > 480 && !faqTriggered.current) {
        faqTriggered.current = true;
        Animated.spring(faqAnim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 9,
          tension: 55,
        }).start();
      }
    });

    return () => {
      clearTimeout(timeout);
      scrollY.removeListener(listenerId);
    };
  }, []);

  const fadeUp = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [24, 0],
        }),
      },
    ],
  });

  const HERO_H = SCREEN_H - insets.top - 52; // full viewport minus nav

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Nav */}
      <View style={styles.navbar}>
        <Pressable
          onPress={onBack}
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.45 }]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={12}
        >
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backLabel}>Back</Text>
        </Pressable>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + space.xl }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        {/* ── Hero (fills viewport) ── */}
        <View style={[styles.hero, { height: HERO_H }]}>
          <Animated.Text style={[styles.eyebrow, fadeUp(heroAnims[0])]}>
            LAUNCHPAD BONUS
          </Animated.Text>

          <Animated.View style={[styles.amountBlock, fadeUp(heroAnims[1])]}>
            <Text style={styles.earnLabel}>Earn up to</Text>
            <Text style={styles.amount}>$500</Text>
          </Animated.View>

          <Animated.Text style={[styles.heroSub, fadeUp(heroAnims[2])]}>
            Scotiabank matches a percentage of your monthly contributions
            to Scotia iTRADE. The more you invest, the bigger the match.
          </Animated.Text>

          <Animated.Text
            style={[styles.scrollArrow, { transform: [{ translateY: arrowNudge }] }]}
          >
            ↓
          </Animated.Text>
        </View>

        {/* ── Contribution table ── */}
        <Animated.View style={[styles.section, fadeUp(tableAnim)]}>
          <Text style={styles.sectionEyebrow}>HOW IT WORKS</Text>
          <Text style={styles.sectionTitle}>Your contribution, matched</Text>

          <View style={styles.tableCard}>
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <Text style={[styles.col1, styles.thText]}>Monthly deposit</Text>
              <Text style={[styles.col2, styles.thText]}>Match</Text>
              <Text style={[styles.col3, styles.thText]}>Bonus</Text>
            </View>
            {TABLE_ROWS.map((row, i) => (
              <View key={i} style={[styles.tableRow, i % 2 === 1 && styles.tableRowShaded]}>
                <Text style={[styles.col1, styles.tdDeposit]}>{row.contribution}</Text>
                <Text style={[styles.col2, styles.tdMatch]}>{row.match}</Text>
                <Text style={[styles.col3, styles.tdBonus]}>{row.bonus}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.disclaimer}>
            Placeholder values · final terms at scotiabank.com/launchpad
          </Text>
        </Animated.View>

        {/* ── FAQ ── */}
        <Animated.View style={[styles.section, fadeUp(faqAnim)]}>
          <Text style={styles.sectionEyebrow}>QUESTIONS</Text>
          <Text style={styles.sectionTitle}>FAQ</Text>

          <View style={styles.faqCard}>
            {FAQS.map((faq, i) => (
              <FaqItem
                key={i}
                q={faq.q}
                a={faq.a}
                isLast={i === FAQS.length - 1}
              />
            ))}
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },

  navbar: {
    height: 52,
    paddingHorizontal: space.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  backArrow: {
    fontSize: 28,
    lineHeight: 32,
    color: colors.linkBlue,
    fontFamily: fonts.regular,
    marginTop: -2,
  },
  backLabel: { fontSize: 15, fontFamily: fonts.medium, color: colors.linkBlue },

  // Hero
  hero: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.lg,
    gap: 0,
  },
  eyebrow: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 2,
    color: colors.gray400,
    marginBottom: space.xl,
  },
  amountBlock: { alignItems: 'center' },
  earnLabel: {
    fontFamily: fonts.medium,
    fontSize: 19,
    color: colors.gray600,
  },
  amount: {
    fontFamily: fonts.extrabold,
    fontSize: 96,
    lineHeight: 100,
    color: colors.red,
    letterSpacing: -3,
  },
  heroSub: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.gray500,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: space.lg,
    maxWidth: 300,
  },
  scrollArrow: {
    position: 'absolute',
    bottom: space.xl,
    fontSize: 18,
    color: colors.gray400,
  },

  // Sections
  section: {
    paddingHorizontal: space.lg,
    paddingTop: space.xl,
    paddingBottom: space.lg,
  },
  sectionEyebrow: {
    fontFamily: fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.8,
    color: colors.gray400,
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.inkStrong,
    letterSpacing: -0.4,
    marginBottom: space.lg,
  },

  // Table
  tableCard: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tableHeaderRow: {
    backgroundColor: colors.inkStrong,
    borderTopWidth: 0,
  },
  tableRowShaded: { backgroundColor: colors.surface },
  col1: { flex: 2.2, paddingVertical: 12, paddingLeft: 14, paddingRight: 8, fontSize: 13 },
  col2: { flex: 0.9, paddingVertical: 12, paddingHorizontal: 6, fontSize: 13, textAlign: 'center' },
  col3: { flex: 1.4, paddingVertical: 12, paddingLeft: 6, paddingRight: 14, fontSize: 13, textAlign: 'right' },
  thText: { fontFamily: fonts.semibold, fontSize: 11, letterSpacing: 0.3, color: colors.white },
  tdDeposit: { fontFamily: fonts.regular, color: colors.ink },
  tdMatch: { fontFamily: fonts.bold, color: colors.red, textAlign: 'center' },
  tdBonus: { fontFamily: fonts.semibold, color: colors.inkStrong, textAlign: 'right' },
  disclaimer: {
    marginTop: 10,
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.gray400,
    textAlign: 'center',
  },

  // FAQ
  faqCard: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  faqItem: { paddingHorizontal: space.md },
  faqDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: space.md,
  },
  faqQ: {
    flex: 1,
    fontFamily: fonts.semibold,
    fontSize: 14.5,
    color: colors.inkStrong,
    lineHeight: 20,
    paddingRight: space.sm,
  },
  faqChevron: { fontFamily: fonts.regular, fontSize: 22, color: colors.gray400, lineHeight: 28 },
  faqMeasure: { position: 'absolute', left: 0, right: 0 },
  faqA: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.gray600,
    lineHeight: 22,
    paddingBottom: space.md,
  },
});
