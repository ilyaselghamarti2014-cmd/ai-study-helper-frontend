'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Rocket, 
  BookOpen, 
  Target, 
  Calendar,
  ChevronRight,
  Check,
  X,
  Sparkles
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { api } from '@/lib/api';

interface OnboardingData {
  step: number;
  completed: boolean;
  data: {
    interests?: string[];
    goals?: string[];
    studyPreferences?: {
      dailyHours: number;
      preferredTime: string;
      studyStyle: string;
    };
  };
}

export default function OnboardingPage() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [onboardingData, setOnboardingData] = useState({
    interests: [] as string[],
    goals: [] as string[],
    studyPreferences: {
      dailyHours: 2,
      preferredTime: 'morning',
      studyStyle: 'visual'
    }
  });

  const [interestInput, setInterestInput] = useState('');
  const [goalInput, setGoalInput] = useState('');

  const interestOptions = [
    'Mathematics', 'Science', 'Programming', 'Languages',
    'History', 'Literature', 'Art', 'Music', 'Business', 'Other'
  ];

  const goalOptions = [
    'Improve grades', 'Learn new skill', 'Prepare for exam',
    'Career advancement', 'Personal growth', 'Academic research'
  ];

  useEffect(() => {
    setMounted(true);
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const response = await api.getOnboardingStatus();
      if (response.data.completed) {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error('Failed to check onboarding status');
    }
  };

  const handleAddInterest = (interest: string) => {
    if (!onboardingData.interests.includes(interest)) {
      setOnboardingData({
        ...onboardingData,
        interests: [...onboardingData.interests, interest]
      });
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setOnboardingData({
      ...onboardingData,
      interests: onboardingData.interests.filter(i => i !== interest)
    });
  };

  const handleAddGoal = (goal: string) => {
    if (!onboardingData.goals.includes(goal)) {
      setOnboardingData({
        ...onboardingData,
        goals: [...onboardingData.goals, goal]
      });
    }
  };

  const handleRemoveGoal = (goal: string) => {
    setOnboardingData({
      ...onboardingData,
      goals: onboardingData.goals.filter(g => g !== goal)
    });
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      await completeOnboarding();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const completeOnboarding = async () => {
    try {
      setLoading(true);
      await api.updateOnboarding(onboardingData);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Failed to complete onboarding');
      setLoading(false);
    }
  };

  const skipOnboarding = async () => {
    try {
      await api.skipOnboarding();
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Failed to skip onboarding');
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Rocket className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl dark:text-white">Welcome to AI Study Helper</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Let's personalize your learning experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Steps */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full flex-1 ${
                    s <= step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>

            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
              >
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Step 1: Interests */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">
                    What subjects interest you?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Select the subjects you want to study
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <Badge
                      key={interest}
                      variant={onboardingData.interests.includes(interest) ? 'default' : 'outline'}
                      onClick={() => handleAddInterest(interest)}
                      className="cursor-pointer px-4 py-2 dark:border-gray-600 dark:text-white"
                    >
                      {onboardingData.interests.includes(interest) && (
                        <Check className="w-3 h-3 mr-1" />
                      )}
                      {interest}
                    </Badge>
                  ))}
                </div>

                {onboardingData.interests.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {onboardingData.interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      >
                        {interest}
                        <X
                          className="w-3 h-3 ml-1 cursor-pointer"
                          onClick={() => handleRemoveInterest(interest)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2: Goals */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">
                    What are your learning goals?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Select your primary learning objectives
                  </p>
                </div>

                <div className="space-y-2">
                  {goalOptions.map((goal) => (
                    <div
                      key={goal}
                      onClick={() => handleAddGoal(goal)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        onboardingData.goals.includes(goal)
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="dark:text-white">{goal}</span>
                        {onboardingData.goals.includes(goal) && (
                          <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Study Preferences */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">
                    Set your study preferences
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Customize your study schedule
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">
                    Daily Study Hours
                  </label>
                  <Input
                    type="number"
                    value={onboardingData.studyPreferences.dailyHours}
                    onChange={(e) => setOnboardingData({
                      ...onboardingData,
                      studyPreferences: {
                        ...onboardingData.studyPreferences,
                        dailyHours: parseInt(e.target.value)
                      }
                    })}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">
                    Preferred Study Time
                  </label>
                  <select
                    value={onboardingData.studyPreferences.preferredTime}
                    onChange={(e) => setOnboardingData({
                      ...onboardingData,
                      studyPreferences: {
                        ...onboardingData.studyPreferences,
                        preferredTime: e.target.value
                      }
                    })}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">
                    Learning Style
                  </label>
                  <select
                    value={onboardingData.studyPreferences.studyStyle}
                    onChange={(e) => setOnboardingData({
                      ...onboardingData,
                      studyPreferences: {
                        ...onboardingData.studyPreferences,
                        studyStyle: e.target.value
                      }
                    })}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="visual">Visual</option>
                    <option value="auditory">Auditory</option>
                    <option value="kinesthetic">Kinesthetic</option>
                    <option value="reading">Reading/Writing</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="dark:border-gray-600 dark:text-white"
              >
                Back
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={skipOnboarding}
                  className="dark:text-white"
                >
                  Skip
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {step === 3 ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Complete
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
