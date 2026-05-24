'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Layers, 
  Sparkles, 
  Brain,
  RotateCw,
  CheckCircle,
  XCircle,
  Plus,
  BookOpen,
  TrendingUp,
  Clock,
  Play
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { aiApi } from '@/lib/api';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  topic: string;
  mastery: number;
  lastReviewed: string;
}

interface Deck {
  id: string;
  name: string;
  topic: string;
  cardCount: number;
  mastery: number;
}

export default function FlashcardsPage() {
  const [mounted, setMounted] = useState(false);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [newDeckTopic, setNewDeckTopic] = useState('');
  const [studyMode, setStudyMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchFlashcardData();
  }, []);

  const fetchFlashcardData = async () => {
    try {
      setLoading(true);
      // Mock data - in real implementation, this would come from API
      setDecks([
        {
          id: '1',
          name: 'Calculus Basics',
          topic: 'Mathematics',
          cardCount: 25,
          mastery: 78
        },
        {
          id: '2',
          name: 'Physics Formulas',
          topic: 'Physics',
          cardCount: 30,
          mastery: 65
        },
        {
          id: '3',
          name: 'Chemistry Elements',
          topic: 'Chemistry',
          cardCount: 20,
          mastery: 85
        }
      ]);
    } catch (err) {
      setError('Failed to load flashcard data');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFlashcards = async () => {
    if (!newDeckTopic) return;
    try {
      setGenerating(true);
      const response = await aiApi.generateFlashcards({
        topic: newDeckTopic,
        cardCount: 10,
        difficulty: 'MEDIUM'
      });
      setGenerating(false);
      // Process the AI response and create new deck
      setNewDeckTopic('');
    } catch (err) {
      setError('Failed to generate flashcards');
      setGenerating(false);
    }
  };

  const handleStartStudy = (deckId: string) => {
    // In real implementation, this would load cards from the deck
    setCurrentCard({
      id: '1',
      front: 'What is the derivative of x²?',
      back: '2x',
      topic: 'Calculus',
      mastery: 75,
      lastReviewed: new Date().toISOString()
    });
    setStudyMode(true);
    setShowAnswer(false);
  };

  const handleFlip = () => {
    setShowAnswer(!showAnswer);
  };

  const handleRate = (rating: 'easy' | 'medium' | 'hard') => {
    // In real implementation, this would update the card's mastery level
    // and move to the next card
    setShowAnswer(false);
    // For demo, just flip back
    setCurrentCard(null);
    setStudyMode(false);
  };

  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Flashcards Intelligence
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              AI-powered flashcards with spaced repetition
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Deck
          </Button>
        </motion.div>

        {/* Study Mode */}
        {studyMode && currentCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-6">
                  <Badge variant="outline" className="dark:border-gray-600 dark:text-white">
                    {currentCard.topic}
                  </Badge>
                  
                  <div className="min-h-48 flex items-center justify-center">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {showAnswer ? currentCard.back : currentCard.front}
                    </p>
                  </div>

                  {!showAnswer ? (
                    <Button
                      onClick={handleFlip}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <RotateCw className="w-4 h-4 mr-2" />
                      Show Answer
                    </Button>
                  ) : (
                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={() => handleRate('hard')}
                        variant="outline"
                        className="border-red-500 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Hard
                      </Button>
                      <Button
                        onClick={() => handleRate('medium')}
                        variant="outline"
                        className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-700 dark:text-yellow-400"
                      >
                        <RotateCw className="w-4 h-4 mr-2" />
                        Medium
                      </Button>
                      <Button
                        onClick={() => handleRate('easy')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Easy
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {!studyMode && (
          <>
            {/* AI Generator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 dark:border-purple-700">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Input
                      placeholder="Enter a topic to generate AI flashcards..."
                      value={newDeckTopic}
                      onChange={(e) => setNewDeckTopic(e.target.value)}
                      className="flex-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    <Button
                      onClick={handleGenerateFlashcards}
                      disabled={generating || !newDeckTopic}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {generating ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

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

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Decks Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Your Decks
                    </h2>
                    <Badge variant="secondary" className="dark:bg-gray-700 dark:text-white">
                      {decks.length} decks
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {decks.map((deck, index) => (
                      <motion.div
                        key={deck.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg dark:text-white">
                                  {deck.name}
                                </CardTitle>
                                <CardDescription className="dark:text-gray-400">
                                  {deck.topic}
                                </CardDescription>
                              </div>
                              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-1" />
                                {deck.cardCount} cards
                              </div>
                              <div className="flex items-center">
                                <Brain className="w-4 h-4 mr-1" />
                                {deck.mastery}% mastery
                              </div>
                            </div>

                            {/* Mastery Progress */}
                            <div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full transition-all"
                                  style={{ width: `${deck.mastery}%` }}
                                />
                              </div>
                            </div>

                            <Button
                              onClick={() => handleStartStudy(deck.id)}
                              className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Study Now
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="dark:text-white">Your Progress</CardTitle>
                      <CardDescription className="dark:text-gray-400">
                        Flashcard statistics and performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-900 dark:text-white">75</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Cards Mastered</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-900 dark:text-white">82%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Accuracy</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-900 dark:text-white">7</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Day Streak</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-900 dark:text-white">2.5h</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Study</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
