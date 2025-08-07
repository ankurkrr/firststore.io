import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface OnboardingCarouselProps {
  onComplete: () => void;
}

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: "Groceries at Your Doorstep in 10–30 Minutes",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/d4d7a54db84daab01cb13111fc494cf55bdcf854?width=672",
    buttonText: "Next"
  },
  {
    id: 2,
    title: "Trusted Franchise Stores Near You",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/5f829c3611cd7d8b61946138b1feb81fd6b179f6?width=672",
    buttonText: "Next"
  },
  {
    id: 3,
    title: "Real-Time Tracking & Easy Returns",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/e06a5512d73176cbf00205b2687052a034c3242c?width=672",
    buttonText: "Get Started!"
  }
];

export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < onboardingData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentData = onboardingData[currentSlide];

  return (
    <View style={styles.container}>
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
          <Ionicons name="wifi" size={16} color={Colors.dark} />
          <View style={styles.battery}>
            <View style={styles.batteryLevel} />
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressBar,
                {
                  width: index === currentSlide ? 126 : 24,
                  backgroundColor: 
                    index === currentSlide ? Colors.primary : 
                    index < currentSlide ? Colors.primary : Colors.gray
                }
              ]}
            />
          ))}
        </View>

        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip →</Text>
        </TouchableOpacity>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{currentData.title}</Text>
        </View>

        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: currentData.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>{currentData.buttonText}</Text>
        </TouchableOpacity>
      </View>

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 50,
    height: 44,
  },
  timeContainer: {
    backgroundColor: Colors.dark,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeText: {
    fontSize: 15,
    color: 'white',
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
    backgroundColor: Colors.dark,
    borderRadius: 1,
  },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: 'rgba(22,22,22,0.35)',
    borderRadius: 2,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  batteryLevel: {
    flex: 1,
    backgroundColor: Colors.dark,
    borderRadius: 1,
  },
  mainContent: {
    flex: 1,
    backgroundColor: Colors.dark,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    borderRadius: 5,
  },
  skipButton: {
    position: 'absolute',
    top: 24,
    right: 20,
  },
  skipText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '400',
  },
  titleContainer: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    color: 'white',
    fontSize: 42,
    fontWeight: '700',
    lineHeight: 50,
    letterSpacing: -0.5,
  },
  imageContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 16,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: Colors.dark,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  homeIndicator: {
    alignSelf: 'center',
    width: 134,
    height: 5,
    backgroundColor: Colors.dark,
    borderRadius: 100,
    marginVertical: 20,
  },
});
