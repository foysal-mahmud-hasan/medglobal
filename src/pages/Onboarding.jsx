import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import UserTypeScreen from '@/components/onboarding/UserTypeScreen';
import BasicInfoScreen from '@/components/onboarding/BasicInfoScreen';
import PregnancyInfoScreen from '@/components/onboarding/PregnancyInfoScreen';
import NotificationScreen from '@/components/onboarding/NotificationScreen';

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    user_type: [],
    country: '',
    age_group: '',
    preferred_language: 'english',
    is_pregnant: false,
    last_menstrual_period: null,
    notifications_enabled: false,
    onboarding_completed: false
  });

  const handleUserType = (types) => {
    setUserData(prev => ({ ...prev, user_type: types }));
    setStep(2);
  };

  const handleBasicInfo = (info) => {
    setUserData(prev => ({ ...prev, ...info }));
    // If pregnancy selected, show pregnancy screen
    if (userData.user_type.includes('pregnancy')) {
      setStep(3);
    } else {
      setStep(4);
    }
  };

  const handlePregnancyInfo = (info) => {
    setUserData(prev => ({ ...prev, ...info }));
    setStep(4);
  };

  const handleComplete = async (notificationsEnabled) => {
    const finalData = {
      ...userData,
      notifications_enabled: notificationsEnabled,
      onboarding_completed: true
    };
    
    // Calculate due date if LMP is provided
    if (finalData.last_menstrual_period) {
      const lmp = new Date(finalData.last_menstrual_period);
      const dueDate = new Date(lmp);
      dueDate.setDate(dueDate.getDate() + 280); // 40 weeks
      finalData.due_date = dueDate.toISOString().split('T')[0];
    }

    await base44.entities.UserProfile.create(finalData);
    window.location.href = createPageUrl('Home');
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <WelcomeScreen 
            key="welcome"
            onContinue={() => setStep(1)} 
          />
        )}
        {step === 1 && (
          <UserTypeScreen 
            key="usertype"
            onContinue={handleUserType}
            onBack={() => setStep(0)}
          />
        )}
        {step === 2 && (
          <BasicInfoScreen 
            key="basicinfo"
            onContinue={handleBasicInfo}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <PregnancyInfoScreen 
            key="pregnancy"
            onContinue={handlePregnancyInfo}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && (
          <NotificationScreen 
            key="notifications"
            onComplete={handleComplete}
            onBack={() => userData.user_type.includes('pregnancy') ? setStep(3) : setStep(2)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}