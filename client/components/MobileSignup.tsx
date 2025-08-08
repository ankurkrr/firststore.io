import { useState, useCallback } from 'react';
import { ChevronLeft } from 'lucide-react';

interface MobileSignupProps {
  onComplete: () => void;
  onBack: () => void;
}

export function MobileSignup({ onComplete, onBack }: MobileSignupProps) {
  const [step, setStep] = useState<'input' | 'otp' | 'profile'>('input');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePhone = useCallback((phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  }, []);

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const handlePhoneSubmit = useCallback(() => {
    try {
      setErrors({});

      if (!phoneNumber.trim()) {
        setErrors({ phone: 'Phone number is required' });
        return;
      }

      if (!validatePhone(phoneNumber)) {
        setErrors({ phone: 'Please enter a valid 10-digit mobile number' });
        return;
      }

      if (!isAgreed) {
        setErrors({ agreement: 'Please agree to the terms and conditions' });
        return;
      }

      setStep('otp');
    } catch (error) {
      console.error('Error in phone submit:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    }
  }, [phoneNumber, isAgreed, validatePhone]);

  const handleOtpSubmit = useCallback(() => {
    try {
      const otpString = otp.join('');
      if (otpString.length !== 6) {
        setErrors({ otp: 'Please enter complete OTP' });
        return;
      }

      setErrors({});
      setStep('profile');
    } catch (error) {
      console.error('Error in OTP submit:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    }
  }, [otp]);

  const handleOtpChange = useCallback((index: number, value: string) => {
    try {
      if (value.length <= 1 && /^\d*$/.test(value)) {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Clear errors when user starts typing
        if (errors.otp) {
          setErrors(prev => ({ ...prev, otp: '' }));
        }

        // Auto-focus next input
        if (value && index < 5) {
          const nextInput = document.getElementById(`otp-${index + 1}`);
          nextInput?.focus();
        }
      }
    } catch (error) {
      console.error('Error in OTP change:', error);
    }
  }, [otp, errors.otp]);

  const handleProfileSubmit = useCallback(() => {
    try {
      setErrors({});

      if (!fullName.trim()) {
        setErrors({ fullName: 'Full name is required' });
        return;
      }

      if (!email.trim()) {
        setErrors({ email: 'Email is required' });
        return;
      }

      if (!validateEmail(email)) {
        setErrors({ email: 'Please enter a valid email address' });
        return;
      }

      onComplete();
    } catch (error) {
      console.error('Error in profile submit:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    }
  }, [fullName, email, onComplete, validateEmail]);

  if (step === 'input') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Back Button */}
        <div className="px-4 py-3 pt-8">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-firststore-dark" />
          </button>
        </div>

        {/* Header */}
        <div className="px-4 mb-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-firststore-teal rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7Z"/>
              </svg>
            </div>
            <span className="text-firststore-dark text-2xl font-montserrat font-bold">FirstStore</span>
          </div>
          
          <h1 className="text-firststore-dark text-2xl font-bold tracking-tight mb-2">
            Welcome to FirstStore
          </h1>
          <p className="text-firststore-gray text-base tracking-tight">
            Create an account in few easy steps
          </p>
        </div>

        {/* Form */}
        <div className="px-4 flex-1">
          <div className="mb-6">
            <label className="text-firststore-dark text-sm font-montserrat font-bold mb-3 block">
              Mobile Number
            </label>
            <div className="flex">
              <div className="bg-gray-50 border border-firststore-border rounded-l-lg px-3 py-4 flex items-center space-x-2">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/7735f81641dbedd13efa7bed262c9a46e687a6a0?width=48" 
                  alt="India Flag" 
                  className="w-6 h-4"
                />
                <span className="text-sm font-montserrat">+91</span>
                <svg className="w-3 h-2 text-firststore-dark" fill="currentColor" viewBox="0 0 8 4">
                  <path d="M4 4L0.666667 0.666667H7.33333L4 4Z"/>
                </svg>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (errors.phone) {
                    setErrors(prev => ({ ...prev, phone: '' }));
                  }
                }}
                placeholder="Enter your mobile number"
                className={`flex-1 border border-l-0 rounded-r-lg px-4 py-4 text-sm font-montserrat focus:outline-none ${
                  errors.phone
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-firststore-border focus:border-firststore-teal/50'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="flex items-start space-x-3 mb-8">
            <input
              type="checkbox"
              id="agreement"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="w-4 h-4 mt-0.5 accent-firststore-teal"
            />
            <label htmlFor="agreement" className="text-xs font-montserrat font-bold">
              I agree to FirstStore's{' '}
              <span className="text-firststore-teal">User Agreement</span> &{' '}
              <span className="text-firststore-teal">Privacy Policy</span>
            </label>
          </div>
          {errors.agreement && (
            <p className="text-red-500 text-xs mb-4">{errors.agreement}</p>
          )}
          {errors.general && (
            <p className="text-red-500 text-xs mb-4">{errors.general}</p>
          )}

          <button
            onClick={handlePhoneSubmit}
            disabled={!phoneNumber || !isAgreed}
            className={`w-full py-4 rounded-lg text-sm font-montserrat font-bold tracking-tight ${
              phoneNumber && isAgreed
                ? 'bg-firststore-teal text-white'
                : 'bg-gray-300 text-firststore-gray'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Back Button */}
        <div className="px-4 py-3 pt-8">
          <button
            onClick={() => setStep('input')}
            className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-firststore-dark" />
          </button>
        </div>

        {/* Header */}
        <div className="px-4 mb-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-firststore-teal rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7Z"/>
              </svg>
            </div>
            <span className="text-firststore-dark text-2xl font-montserrat font-bold">FirstStore</span>
          </div>
          
          <h1 className="text-firststore-dark text-2xl font-bold tracking-tight mb-2">
            Verify Phone Number
          </h1>
          <p className="text-firststore-gray text-base font-semibold tracking-tight">
            Enter the OTP sent to <span className="font-bold">+91 {phoneNumber}</span>
          </p>
        </div>

        {/* OTP Input */}
        <div className="px-4 flex-1">
          <div className="flex space-x-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-16 h-20 border border-gray-300 rounded-lg text-center text-xl font-bold focus:outline-none focus:border-firststore-teal"
                maxLength={1}
              />
            ))}
          </div>

          <p className="text-firststore-dark text-base font-montserrat mb-8">
            Resend Code in <span className="font-bold">00:{countdown.toString().padStart(2, '0')}</span>
          </p>

          <button
            onClick={handleOtpSubmit}
            className="w-full bg-firststore-teal text-white py-4 rounded-lg text-sm font-montserrat font-bold tracking-tight"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // Profile step
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Back Button */}
      <div className="px-4 py-3 pt-8">
        <button
          onClick={() => setStep('otp')}
          className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 text-firststore-dark" />
        </button>
      </div>

      {/* Header */}
      <div className="px-4 mb-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-firststore-teal rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7Z"/>
            </svg>
          </div>
          <span className="text-firststore-dark text-2xl font-montserrat font-bold">FirstStore</span>
        </div>
        
        <h1 className="text-firststore-dark text-2xl font-bold tracking-tight mb-2">
          Complete Your Profile
        </h1>
        <p className="text-firststore-gray text-base tracking-tight">
          Enter your personal details
        </p>
      </div>

      {/* Form */}
      <div className="px-4 flex-1">
        <div className="mb-6">
          <label className="text-firststore-dark text-sm font-montserrat font-bold mb-3 block">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-lg px-4 py-4 text-sm font-montserrat focus:outline-none focus:border-firststore-teal"
          />
        </div>

        <div className="mb-8">
          <label className="text-firststore-dark text-sm font-montserrat font-bold mb-3 block">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full border border-gray-300 rounded-lg px-4 py-4 text-sm font-montserrat focus:outline-none focus:border-firststore-teal"
          />
        </div>

        <button
          onClick={handleProfileSubmit}
          disabled={!fullName || !email}
          className={`w-full py-4 rounded-lg text-sm font-montserrat font-bold tracking-tight ${
            fullName && email
              ? 'bg-firststore-teal text-white'
              : 'bg-gray-300 text-firststore-gray'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
