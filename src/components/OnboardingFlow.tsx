'use client';

import { useState, useEffect } from 'react';
import { isFeatureEnabled } from '@/lib/featureFlags';
import apiClient from '@/lib/apiClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface OnboardingData {
  step: number;
  completed: boolean;
  preferences: {
    subjects: string[];
    studyGoals: string;
    studyTime: string;
    experienceLevel: string;
    interests: string[];
  };
}

export default function OnboardingFlow() {
  const [data, setData] = useState<OnboardingData>({
    step: 1,
    completed: false,
    preferences: {
      subjects: [],
      studyGoals: '',
      studyTime: '',
      experienceLevel: '',
      interests: [],
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFeatureEnabled('onboarding')) {
      loadOnboardingStatus();
    }
  }, []);

  const loadOnboardingStatus = async () => {
    try {
      const response = await apiClient.getUserOnboarding();
      setData(response.data);
    } catch (error) {
      console.error('Failed to load onboarding status:', error);
    }
  };

  const completeStep = async () => {
    try {
      setLoading(true);
      await apiClient.updateOnboarding({
        ...data,
        step: data.step + 1,
      });
      setData(prev => ({ ...prev, step: prev.step + 1 }));
    } catch (error) {
      console.error('Failed to complete step:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      setLoading(true);
      await apiClient.completeOnboarding(data.preferences);
      setData(prev => ({ ...prev, completed: true }));
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  const skipOnboarding = async () => {
    try {
      setLoading(true);
      await apiClient.skipOnboarding();
      setData(prev => ({ ...prev, completed: true }));
    } catch (error) {
      console.error('Failed to skip onboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isFeatureEnabled('onboarding')) {
    return null;
  }

  if (data.completed) {
    return (
      <Card className="p-6 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-bold mb-2">Onboarding Complete!</h3>
        <p className="text-gray-600">You're all set up and ready to learn.</p>
        <Button onClick={loadOnboardingStatus} className="mt-4">
          Reset Onboarding
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome to AI Study Helper!</h2>
      <p className="text-gray-600">Let's set up your personalized learning experience.</p>

      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex-1 flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                data.step >= step
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {data.step > step ? '✓' : step}
            </div>
            {step < 4 && (
              <div
                className={`flex-1 h-2 mx-2 ${
                  data.step > step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {data.step === 1 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Step 1: What do you want to learn?</h3>
          <p className="text-gray-600 mb-4">Select the subjects you're interested in.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {['Mathematics', 'Science', 'Programming', 'Languages', 'History', 'Art'].map((subject) => (
              <button
                key={subject}
                onClick={() => {
                  setData(prev => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      subjects: prev.preferences.subjects.includes(subject)
                        ? prev.preferences.subjects.filter(s => s !== subject)
                        : [...prev.preferences.subjects, subject],
                    },
                  }));
                }}
                className={`p-3 border rounded ${
                  data.preferences.subjects.includes(subject)
                    ? 'bg-blue-100 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
          <Button
            onClick={completeStep}
            disabled={data.preferences.subjects.length === 0 || loading}
            className="w-full"
          >
            {loading ? 'Loading...' : 'Continue'}
          </Button>
        </Card>
      )}

      {data.step === 2 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Step 2: What are your study goals?</h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Primary Goal</label>
              <select
                value={data.preferences.studyGoals}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, studyGoals: e.target.value },
                }))}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a goal</option>
                <option value="exam">Prepare for an exam</option>
                <option value="skill">Learn a new skill</option>
                <option value="improve">Improve grades</option>
                <option value="career">Career advancement</option>
                <option value="personal">Personal interest</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Experience Level</label>
              <select
                value={data.preferences.experienceLevel}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, experienceLevel: e.target.value },
                }))}
                className="w-full p-2 border rounded"
              >
                <option value="">Select your level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setData(prev => ({ ...prev, step: prev.step - 1 }))}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={completeStep}
              disabled={!data.preferences.studyGoals || !data.preferences.experienceLevel || loading}
              className="flex-1"
            >
              {loading ? 'Loading...' : 'Continue'}
            </Button>
          </div>
        </Card>
      )}

      {data.step === 3 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Step 3: How much can you study?</h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Daily Study Time</label>
              <select
                value={data.preferences.studyTime}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, studyTime: e.target.value },
                }))}
                className="w-full p-2 border rounded"
              >
                <option value="">Select time</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="180">3+ hours</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setData(prev => ({ ...prev, step: prev.step - 1 }))}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={completeStep}
              disabled={!data.preferences.studyTime || loading}
              className="flex-1"
            >
              {loading ? 'Loading...' : 'Continue'}
            </Button>
          </div>
        </Card>
      )}

      {data.step === 4 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Step 4: Additional Interests</h3>
          <p className="text-gray-600 mb-4">Select any additional learning interests (optional).</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {['Flashcards', 'Quizzes', 'Study Plans', 'Exam Prep', 'Learning Paths', 'Collaboration'].map((interest) => (
              <button
                key={interest}
                onClick={() => {
                  setData(prev => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      interests: prev.preferences.interests.includes(interest)
                        ? prev.preferences.interests.filter(i => i !== interest)
                        : [...prev.preferences.interests, interest],
                    },
                  }));
                }}
                className={`p-3 border rounded ${
                  data.preferences.interests.includes(interest)
                    ? 'bg-blue-100 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setData(prev => ({ ...prev, step: prev.step - 1 }))}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={completeOnboarding}
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Loading...' : 'Complete Setup'}
            </Button>
          </div>
          <Button
            onClick={skipOnboarding}
            variant="ghost"
            className="w-full mt-2"
            disabled={loading}
          >
            Skip for now
          </Button>
        </Card>
      )}
    </div>
  );
}
