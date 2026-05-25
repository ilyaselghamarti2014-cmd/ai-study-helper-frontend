'use client';

import { useState } from 'react';
import { isFeatureEnabled } from '@/lib/featureFlags';
import apiClient from '@/lib/apiClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface SearchResult {
  id: number;
  entityType: string;
  entityId: number;
  title: string;
  content: string;
  tags?: string;
  relevanceScore: number;
}

export default function SearchSystem() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const response = await apiClient.search(query);
      setResults(response.data);
      setSearched(true);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (!isFeatureEnabled('semanticSearch')) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Semantic Search</h2>

      <Card className="p-6">
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search your notes, flashcards, study plans..."
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </Card>

      {searched && (
        <div className="space-y-4">
          <p className="text-gray-600">
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </p>

          {results.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-500">No results found for "{query}"</p>
              <p className="text-sm text-gray-400 mt-2">
                Try different keywords or check your spelling
              </p>
            </Card>
          ) : (
            results.map((result) => (
              <Card key={result.id} className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Badge>{result.entityType}</Badge>
                    {result.tags && (
                      <Badge variant="outline" className="ml-2">
                        {result.tags}
                      </Badge>
                    )}
                  </div>
                  <Badge variant="secondary">
                    {(result.relevanceScore * 100).toFixed(0)}% match
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
                <p className="text-gray-600 line-clamp-3">{result.content}</p>
              </Card>
            ))
          )}
        </div>
      )}

      {!searched && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Search Tips</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Use specific keywords for better results</li>
            <li>• Search by topic, concept, or question</li>
            <li>• Semantic search understands context and meaning</li>
            <li>• Results are ranked by relevance to your query</li>
          </ul>
        </Card>
      )}
    </div>
  );
}
