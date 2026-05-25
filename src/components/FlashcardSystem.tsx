'use client';

import { useState, useEffect } from 'react';
import { isFeatureEnabled } from '@/lib/featureFlags';
import apiClient from '@/lib/apiClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  explanation?: string;
  topic: string;
  box: number;
  nextReview: string;
  reviews: number;
  correctReviews: number;
  aiGenerated: boolean;
}

export default function FlashcardSystem() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [dueCards, setDueCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [content, setContent] = useState('');
  const [mode, setMode] = useState<'browse' | 'study' | 'create'>('browse');

  useEffect(() => {
    if (isFeatureEnabled('aiFlashcards')) {
      loadFlashcards();
    }
  }, []);

  const loadFlashcards = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getFlashcards();
      setFlashcards(response.data);
    } catch (error) {
      console.error('Failed to load flashcards:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDueCards = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getDueFlashcards();
      setDueCards(response.data);
      if (response.data.length > 0) {
        setCurrentCard(response.data[0]);
        setShowAnswer(false);
      }
    } catch (error) {
      console.error('Failed to load due cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAIFlashcards = async () => {
    try {
      setGenerating(true);
      const response = await apiClient.generateAIFlashcards(content, 10);
      await loadFlashcards();
      setContent('');
      setMode('browse');
    } catch (error) {
      console.error('Failed to generate flashcards:', error);
    } finally {
      setGenerating(false);
    }
  };

  const reviewCard = async (correct: boolean) => {
    if (!currentCard) return;

    try {
      await apiClient.reviewFlashcard(currentCard.id, correct);
      
      const currentIndex = dueCards.findIndex(c => c.id === currentCard.id);
      if (currentIndex < dueCards.length - 1) {
        setCurrentCard(dueCards[currentIndex + 1]);
        setShowAnswer(false);
      } else {
        setCurrentCard(null);
        await loadDueCards();
      }
    } catch (error) {
      console.error('Failed to review card:', error);
    }
  };

  if (!isFeatureEnabled('aiFlashcards')) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">AI Flashcards</h2>
        <div className="flex gap-2">
          <Button
            variant={mode === 'browse' ? 'default' : 'outline'}
            onClick={() => setMode('browse')}
          >
            Browse
          </Button>
          <Button
            variant={mode === 'study' ? 'default' : 'outline'}
            onClick={() => {
              setMode('study');
              loadDueCards();
            }}
          >
            Study Due Cards
          </Button>
          <Button
            variant={mode === 'create' ? 'default' : 'outline'}
            onClick={() => setMode('create')}
          >
            Generate
          </Button>
        </div>
      </div>

      {mode === 'browse' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Flashcards</h3>
          {loading ? (
            <p>Loading...</p>
          ) : flashcards.length === 0 ? (
            <p className="text-gray-500">No flashcards yet. Generate some from your notes!</p>
          ) : (
            <div className="space-y-3">
              {flashcards.map((card) => (
                <div
                  key={card.id}
                  className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setCurrentCard(card);
                    setShowAnswer(false);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{card.question}</h4>
                      <p className="text-sm text-gray-500">{card.topic}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge>Box {card.box}</Badge>
                      {card.aiGenerated && <Badge variant="secondary">AI</Badge>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {mode === 'create' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Generate AI Flashcards</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your notes, lecture content, or study material here..."
                className="w-full p-3 border rounded min-h-[200px]"
              />
            </div>
            <Button
              onClick={generateAIFlashcards}
              disabled={!content || generating}
              className="w-full"
            >
              {generating ? 'Generating...' : 'Generate Flashcards'}
            </Button>
          </div>
        </Card>
      )}

      {mode === 'study' && (
        <div className="space-y-4">
          {dueCards.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-500">No cards due for review! 🎉</p>
              <Button onClick={() => setMode('browse')} className="mt-4">
                Browse All Cards
              </Button>
            </Card>
          ) : currentCard ? (
            <Card className="p-6">
              <div className="mb-4">
                <Badge>Box {currentCard.box}</Badge>
                <span className="ml-2 text-sm text-gray-500">
                  {dueCards.indexOf(currentCard) + 1} of {dueCards.length}
                </span>
              </div>
              
              {!showAnswer ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">{currentCard.question}</h3>
                  <Button onClick={() => setShowAnswer(true)} className="w-full">
                    Show Answer
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">{currentCard.question}</h3>
                  <div className="p-4 bg-blue-50 rounded">
                    <p className="text-lg">{currentCard.answer}</p>
                    {currentCard.explanation && (
                      <p className="text-sm text-gray-600 mt-2">{currentCard.explanation}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => reviewCard(false)}
                      variant="destructive"
                      className="flex-1"
                    >
                      Again
                    </Button>
                    <Button
                      onClick={() => reviewCard(true)}
                      className="flex-1"
                    >
                      Got It!
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ) : (
            <Card className="p-6 text-center">
              <p className="text-gray-500">All due cards reviewed!</p>
              <Button onClick={() => setMode('browse')} className="mt-4">
                Browse All Cards
              </Button>
            </Card>
          )}
        </div>
      )}

      {currentCard && mode === 'browse' && (
        <Card className="p-6">
          <div className="mb-4">
            <Badge>Box {currentCard.box}</Badge>
            {currentCard.aiGenerated && <Badge variant="secondary" className="ml-2">AI Generated</Badge>}
          </div>
          <h3 className="text-xl font-semibold mb-2">{currentCard.question}</h3>
          <div className="p-4 bg-blue-50 rounded mb-4">
            <p className="text-lg">{currentCard.answer}</p>
            {currentCard.explanation && (
              <p className="text-sm text-gray-600 mt-2">{currentCard.explanation}</p>
            )}
          </div>
          <div className="text-sm text-gray-500">
            <p>Reviews: {currentCard.reviews}</p>
            <p>Correct: {currentCard.correctReviews}</p>
            <p>Next Review: {new Date(currentCard.nextReview).toLocaleDateString()}</p>
          </div>
          <Button onClick={() => setCurrentCard(null)} className="mt-4">
            Close
          </Button>
        </Card>
      )}
    </div>
  );
}
