import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>Scotiabank</Text>
        <Text style={styles.prototype}>Casehacks prototype</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.eyebrow}>Hackathon starter</Text>
        <Text style={styles.title}>Build with a Scotia-aligned foundation.</Text>
        <Text style={styles.copy}>
          This React Native app is ready for product screens, demos, and mobile
          flows using the design language in the repo.
        </Text>
      </View>

      <View style={styles.kpiRow}>
        <View style={styles.kpi}>
          <Text style={styles.kpiValue}>01</Text>
          <Text style={styles.kpiLabel}>Prototype</Text>
        </View>
        <View style={styles.kpi}>
          <Text style={styles.kpiValue}>02</Text>
          <Text style={styles.kpiLabel}>Validate</Text>
        </View>
        <View style={styles.kpi}>
          <Text style={styles.kpiValue}>03</Text>
          <Text style={styles.kpiLabel}>Pitch</Text>
        </View>
      </View>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFD',
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 32,
  },
  header: {
    borderBottomColor: '#E2E8EE',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  brand: {
    color: '#EC111A',
    fontSize: 30,
    fontWeight: '800',
  },
  prototype: {
    color: '#747474',
    fontSize: 14,
    marginTop: 4,
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8EE',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 32,
    padding: 24,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  eyebrow: {
    color: '#EC111A',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    color: '#333333',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 38,
    marginTop: 12,
  },
  copy: {
    color: '#333333',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  kpi: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EC111A',
    borderLeftWidth: 5,
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    padding: 14,
  },
  kpiValue: {
    color: '#1A1919',
    fontSize: 24,
    fontWeight: '800',
  },
  kpiLabel: {
    color: '#747474',
    fontSize: 12,
    marginTop: 6,
  },
});
