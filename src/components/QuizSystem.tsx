'use client';

import { useState, useEffect } from 'react';
import { isFeatureEnabled } from '@/lib/featureFlags';
import apiClient from '@/lib/apiClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Quiz {
  id: number;
  title: string;
  topic: string;
  difficulty: string;
  totalQuestions: number;
  score: number;
  aiGenerated: boolean;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

interface QuizOption {
  id: number;
  optionText: string;
  isCorrect: boolean;
}

export default function QuizSystem() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('BEGINNER');

  useEffect(() => {
    if (isFeatureEnabled('adaptiveQuizzes')) {
      loadQuizzes();
    }
  }, []);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getQuizzes();
      setQuizzes(response.data);
    } catch (error) {
      console.error('Failed to load quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAIQuiz = async () => {
    try {
      setGenerating(true);
      const response = await apiClient.generateAIQuiz(topic, difficulty, 10);
      setCurrentQuiz(response.data);
      loadQuizQuestions(response.data.id);
    } catch (error) {
      console.error('Failed to generate quiz:', error);
    } finally {
      setGenerating(false);
    }
  };

  const loadQuizQuestions = async (quizId: number) => {
    try {
      const response = await apiClient.getQuizAttempts(quizId);
      // In production, would load actual questions
      setQuestions([]);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setShowResults(false);
    } catch (error) {
      console.error('Failed to load questions:', error);
    }
  };

  const selectAnswer = (questionId: number, optionId: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    if (!currentQuiz) return;

    try {
      const answers = JSON.stringify(selectedAnswers);
      const response = await apiClient.submitQuizAttempt(currentQuiz.id, answers);
      setScore(response.data.score);
      setShowResults(true);
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  if (!isFeatureEnabled('adaptiveQuizzes')) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Adaptive Quiz System</h2>
        <Button onClick={() => setShowResults(false)}>Back to Quizzes</Button>
      </div>

      {!currentQuiz && (
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Generate AI Quiz</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Topic</label>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a topic (e.g., JavaScript, Calculus, History)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                  <option value="EXPERT">Expert</option>
                </select>
              </div>
              <Button
                onClick={generateAIQuiz}
                disabled={!topic || generating}
                className="w-full"
              >
                {generating ? 'Generating...' : 'Generate Quiz'}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Your Quizzes</h3>
            {loading ? (
              <p>Loading...</p>
            ) : quizzes.length === 0 ? (
              <p className="text-gray-500">No quizzes yet. Generate your first quiz!</p>
            ) : (
              <div className="space-y-3">
                {quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="flex justify-between items-center p-4 border rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setCurrentQuiz(quiz);
                      loadQuizQuestions(quiz.id);
                    }}
                  >
                    <div>
                      <h4 className="font-medium">{quiz.title}</h4>
                      <p className="text-sm text-gray-500">{quiz.topic}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>{quiz.difficulty}</Badge>
                      {quiz.aiGenerated && <Badge variant="secondary">AI Generated</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {currentQuiz && !showResults && (
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold">{currentQuiz.title}</h3>
            <p className="text-gray-500">
              Question {currentQuestionIndex + 1} of {currentQuiz.totalQuestions}
            </p>
          </div>

          {questions.length > 0 && questions[currentQuestionIndex] && (
            <div className="space-y-4">
              <h4 className="text-lg">{questions[currentQuestionIndex].question}</h4>
              <div className="space-y-2">
                {questions[currentQuestionIndex].options.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedAnswers[questions[currentQuestionIndex].id] === option.id ? 'default' : 'outline'}
                    className="w-full text-left justify-start"
                    onClick={() => selectAnswer(questions[currentQuestionIndex].id, option.id)}
                  >
                    {option.optionText}
                  </Button>
                ))}
              </div>
              <Button
                onClick={nextQuestion}
                disabled={!selectedAnswers[questions[currentQuestionIndex].id]}
                className="w-full"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
              </Button>
            </div>
          )}
        </Card>
      )}

      {showResults && (
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-4">Quiz Results</h3>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-blue-600">{score}%</div>
            <p className="text-gray-600">
              You answered {Object.keys(selectedAnswers).length} questions
            </p>
            <Button onClick={() => setShowResults(false)}>Try Another Quiz</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
