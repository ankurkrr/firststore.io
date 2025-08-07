import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface SplashScreenProps {
  onComplete: () => void;
}

const { width, height } = Dimensions.get('window');

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onComplete();
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete, fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>9:41</Text>
        </View>
        <View style={styles.statusIcons}>
          <View style={styles.signalBars}>
            <View style={[styles.bar, { height: 12 }]} />
            <View style={[styles.bar, { height: 16 }]} />
            <View style={[styles.bar, { height: 8 }]} />
            <View style={[styles.bar, { height: 4 }]} />
          </View>
          <Ionicons name="wifi" size={16} color="white" />
          <View style={styles.battery}>
            <View style={styles.batteryLevel} />
          </View>
        </View>
      </View>

      {/* Logo and Brand */}
      <View style={styles.centerContent}>
        <View style={styles.logoContainer}>
          <Ionicons name="storefront" size={24} color="white" />
        </View>
        <Text style={styles.brandText}>FirstStore</Text>
      </View>

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBar: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  timeContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeText: {
    fontSize: 15,
    color: Colors.dark,
    fontWeight: '400',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  bar: {
    width: 4,
    backgroundColor: 'white',
    borderRadius: 1,
  },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    borderRadius: 2,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  batteryLevel: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 1,
  },
  centerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 48,
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Montserrat_700Bold',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 20,
    width: 134,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 100,
  },
});
