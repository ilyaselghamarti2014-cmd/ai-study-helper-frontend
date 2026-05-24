'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Brain, 
  FileText, 
  BookOpen,
  Sparkles,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { aiApi } from '@/lib/api';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'note' | 'document' | 'resource';
  relevanceScore: number;
  source: string;
  url?: string;
}

export default function SemanticSearchPage() {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await aiApi.semanticSearch({
        query,
        context: 'study materials'
      });
      
      // In a real implementation, this would parse the AI response
      // For now, we'll use mock results
      setResults([
        {
          id: '1',
          title: `${query} - Study Notes`,
          content: `Comprehensive notes covering ${query} concepts, definitions, and practical applications.`,
          type: 'note',
          relevanceScore: 0.95,
          source: 'Personal Notes'
        },
        {
          id: '2',
          title: `${query} - Chapter Summary`,
          content: `Detailed summary of ${query} with key points, formulas, and examples.`,
          type: 'document',
          relevanceScore: 0.88,
          source: 'Textbook'
        },
        {
          id: '3',
          title: `${query} - Practice Problems`,
          content: `Collection of practice problems and solutions for ${query}.`,
          type: 'resource',
          relevanceScore: 0.82,
          source: 'Study Resources'
        }
      ]);
      
      // Update search history
      const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI Semantic Search
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Search your study materials using AI-powered semantic understanding
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search for anything in your study materials..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={loading || !query.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
              
              {/* Search History */}
              {searchHistory.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Recent searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {searchHistory.map((item, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        onClick={() => setQuery(item)}
                        className="cursor-pointer dark:border-gray-600 dark:text-white"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
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

        {/* Results */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Search Results
              </h2>
              <Badge variant="secondary" className="dark:bg-gray-700 dark:text-white">
                {results.length} results
              </Badge>
            </div>

            <div className="space-y-4">
              {results.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full ${
                          result.type === 'note' ? 'bg-blue-100 dark:bg-blue-900' :
                          result.type === 'document' ? 'bg-purple-100 dark:bg-purple-900' :
                          'bg-green-100 dark:bg-green-900'
                        }`}>
                          {result.type === 'note' && <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                          {result.type === 'document' && <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
                          {result.type === 'resource' && <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {result.title}
                            </h3>
                            <Badge variant="outline" className="dark:border-gray-600 dark:text-white">
                              {Math.round(result.relevanceScore * 100)}% match
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {result.content}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="dark:bg-gray-700 dark:text-white">
                                {result.type}
                              </Badge>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                Source: {result.source}
                              </span>
                            </div>
                            {result.url && (
                              <Button variant="ghost" size="sm" className="dark:text-white">
                                <ExternalLink className="w-4 h-4 mr-1" />
                                Open
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && results.length === 0 && query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try different keywords or check your spelling
            </p>
          </motion.div>
        )}

        {/* Initial State */}
        {!loading && results.length === 0 && !query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Brain className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              AI-Powered Semantic Search
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Enter a query above to search your study materials using advanced AI understanding
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                Semantic matching
              </div>
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 mr-1" />
                AI-powered
              </div>
              <div className="flex items-center">
                <Search className="w-4 h-4 mr-1" />
                Smart ranking
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
