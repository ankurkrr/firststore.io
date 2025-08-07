import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface MobileSignupProps {
  onComplete: () => void;
  onBack: () => void;
}

export function MobileSignup({ onComplete, onBack }: MobileSignupProps) {
  const [step, setStep] = useState<'input' | 'otp' | 'profile'>('input');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handlePhoneSubmit = () => {
    if (phoneNumber && isAgreed) {
      setStep('otp');
    }
  };

  const handleOtpSubmit = () => {
    setStep('profile');
  };

  const handleProfileSubmit = () => {
    if (fullName && email) {
      onComplete();
    }
  };

  const renderStatusBar = () => (
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
  );

  const renderBackButton = () => (
    <TouchableOpacity style={styles.backButton} onPress={() => {
      if (step === 'input') onBack();
      else if (step === 'otp') setStep('input');
      else if (step === 'profile') setStep('otp');
    }}>
      <Ionicons name="chevron-back" size={24} color={Colors.dark} />
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.logoRow}>
        <View style={styles.logoContainer}>
          <Ionicons name="storefront" size={16} color="white" />
        </View>
        <Text style={styles.brandText}>FirstStore</Text>
      </View>
    </View>
  );

  if (step === 'input') {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {renderStatusBar()}
        {renderBackButton()}
        {renderHeader()}
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Welcome to FirstStore</Text>
            <Text style={styles.subtitle}>Create an account in few easy steps</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Image 
                  source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/7735f81641dbedd13efa7bed262c9a46e687a6a0?width=48' }}
                  style={styles.flag}
                />
                <Text style={styles.countryCodeText}>+91</Text>
                <Ionicons name="chevron-down" size={12} color={Colors.dark} />
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter your mobile number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholderTextColor={Colors.lightGray}
              />
            </View>

            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => setIsAgreed(!isAgreed)}
            >
              <View style={[styles.checkbox, isAgreed && styles.checkboxChecked]}>
                {isAgreed && <Ionicons name="checkmark" size={12} color="white" />}
              </View>
              <Text style={styles.agreementText}>
                I agree to FirstStore's{' '}
                <Text style={styles.linkText}>User Agreement</Text> &{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.nextButton, (!phoneNumber || !isAgreed) && styles.nextButtonDisabled]}
              onPress={handlePhoneSubmit}
              disabled={!phoneNumber || !isAgreed}
            >
              <Text style={[styles.nextButtonText, (!phoneNumber || !isAgreed) && styles.nextButtonTextDisabled]}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.homeIndicator} />
      </KeyboardAvoidingView>
    );
  }

  if (step === 'otp') {
    return (
      <View style={styles.container}>
        {renderStatusBar()}
        {renderBackButton()}
        {renderHeader()}
        
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Verify Phone Number</Text>
            <Text style={styles.subtitle}>
              Enter the OTP sent to <Text style={styles.boldText}>+91 {phoneNumber}</Text>
            </Text>
          </View>

          <View style={styles.otpContainer}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="number-pad"
                textAlign="center"
                value={otp[index]}
                onChangeText={(text) => {
                  const newOtp = [...otp];
                  newOtp[index] = text;
                  setOtp(newOtp);
                }}
              />
            ))}
          </View>

          <Text style={styles.resendText}>
            Resend Code in <Text style={styles.boldText}>00:30</Text>
          </Text>

          <TouchableOpacity style={styles.nextButton} onPress={handleOtpSubmit}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.homeIndicator} />
      </View>
    );
  }

  // Profile step
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {renderStatusBar()}
      {renderBackButton()}
      {renderHeader()}
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>Enter your personal details</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor={Colors.lightGray}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={Colors.lightGray}
            />
          </View>

          <TouchableOpacity
            style={[styles.nextButton, (!fullName || !email) && styles.nextButtonDisabled]}
            onPress={handleProfileSubmit}
            disabled={!fullName || !email}
          >
            <Text style={[styles.nextButtonText, (!fullName || !email) && styles.nextButtonTextDisabled]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.homeIndicator} />
    </KeyboardAvoidingView>
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
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoContainer: {
    width: 32,
    height: 32,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark,
    fontFamily: 'Montserrat_700Bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    letterSpacing: -0.5,
  },
  boldText: {
    fontWeight: '700',
  },
  form: {
    gap: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 12,
    fontFamily: 'Montserrat_700Bold',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  countryCode: {
    backgroundColor: '#FAF7F6',
    paddingHorizontal: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  flag: {
    width: 24,
    height: 16,
  },
  countryCodeText: {
    fontSize: 14,
    color: Colors.dark,
    fontFamily: 'Montserrat_400Regular',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  agreementText: {
    flex: 1,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.gray,
    fontFamily: 'Montserrat_700Bold',
  },
  linkText: {
    color: Colors.primary,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#D9D9D9',
  },
  nextButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Montserrat_700Bold',
  },
  nextButtonTextDisabled: {
    color: Colors.gray,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 32,
  },
  otpInput: {
    width: 54,
    height: 64,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    fontSize: 18,
    fontWeight: '700',
    backgroundColor: 'white',
  },
  resendText: {
    fontSize: 16,
    color: Colors.dark,
    marginBottom: 32,
    fontFamily: 'Montserrat_400Regular',
  },
  inputGroup: {
    gap: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    backgroundColor: 'white',
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
