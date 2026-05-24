import { useEffect, useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, shadow } from '../theme';

const THUMB = 26;
const SPRING = { damping: 22, stiffness: 300, mass: 0.8, useNativeDriver: false } as const;

export function PercentSlider({
  stops,
  value,
  onChange,
}: {
  stops: number[];
  value: number;
  onChange: (v: number) => void;
}) {
  const [, force] = useState(0);
  const geom       = useRef({ x: 0, w: 0 });
  const trackRef   = useRef<View>(null);
  const onChangeRef = useRef(onChange);
  const stopsRef    = useRef(stops);
  const valueRef    = useRef(value);
  onChangeRef.current = onChange;
  stopsRef.current    = stops;
  valueRef.current    = value;

  // Animated values for thumb position and track fill width (px)
  const thumbX = useRef(new Animated.Value(0)).current;
  const fillW  = useRef(new Animated.Value(0)).current;
  const mounted = useRef(false);

  const getFrac = (val: number) => {
    const idx = Math.max(0, stopsRef.current.indexOf(val));
    return stopsRef.current.length > 1 ? idx / (stopsRef.current.length - 1) : 0;
  };

  // When value changes: spring to new position and fire haptic
  useEffect(() => {
    const w = geom.current.w;
    const px = getFrac(value) * w;
    if (w <= 0) return;

    if (!mounted.current) {
      // First time: snap without animation
      thumbX.setValue(px);
      fillW.setValue(px);
      mounted.current = true;
      return;
    }

    Haptics.selectionAsync();
    Animated.spring(thumbX, { toValue: px, ...SPRING }).start();
    Animated.spring(fillW,  { toValue: px, ...SPRING }).start();
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const apply = (absX: number) => {
    const { x, w } = geom.current;
    if (w <= 0) return;
    let frac = (absX - x) / w;
    frac = frac < 0 ? 0 : frac > 1 ? 1 : frac;
    const n   = stopsRef.current.length;
    const idx = Math.round(frac * (n - 1));
    const next = stopsRef.current[idx];
    if (next !== valueRef.current) onChangeRef.current(next);
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_e, g) => apply(g.x0),
      onPanResponderMove: (_e, g) => apply(g.moveX),
    })
  ).current;

  const measure = () =>
    trackRef.current?.measureInWindow((x, _y, w) => {
      geom.current = { x, w };
      // Snap to current position immediately on layout
      const px = getFrac(valueRef.current) * w;
      thumbX.setValue(px);
      fillW.setValue(px);
      mounted.current = true;
      force((t) => t + 1);
    });

  const idx  = Math.max(0, stops.indexOf(value));
  const frac = stops.length > 1 ? idx / (stops.length - 1) : 0;

  return (
    <View style={styles.wrap}>
      <View ref={trackRef} onLayout={measure} {...pan.panHandlers} style={styles.track}>
        <View style={styles.trackBg} />

        {/* Animated fill */}
        <Animated.View style={[styles.trackFill, { width: fillW }]} />

        {/* Tick marks */}
        {stops.map((s, i) => {
          const f = i / (stops.length - 1);
          return (
            <View
              key={s}
              style={[styles.tick, i <= idx && styles.tickActive, { left: `${f * 100}%` }]}
            />
          );
        })}

        {/* Animated thumb */}
        <Animated.View style={[styles.thumb, { left: thumbX, marginLeft: -THUMB / 2 }]}>
          <View style={styles.thumbDot} />
        </Animated.View>
      </View>

      <View style={styles.labels}>
        {stops.map((s, i) => {
          const f = i / (stops.length - 1);
          return (
            <Text
              key={s}
              style={[styles.label, { left: `${f * 100}%` }, s === value && styles.labelActive]}
            >
              {s}%
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: THUMB / 2,
  },
  track: {
    height: 32,
    justifyContent: 'center',
  },
  trackBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.gray200,
  },
  trackFill: {
    position: 'absolute',
    left: 0,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.red,
  },
  tick: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: -4,
    backgroundColor: colors.gray300,
  },
  tickActive: {
    backgroundColor: colors.white,
  },
  thumb: {
    position: 'absolute',
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  thumbDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: colors.red,
  },
  labels: {
    height: 18,
    marginTop: 12,
  },
  label: {
    position: 'absolute',
    width: 44,
    marginLeft: -22,
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.gray500,
  },
  labelActive: {
    fontFamily: fonts.bold,
    color: colors.red,
  },
});
