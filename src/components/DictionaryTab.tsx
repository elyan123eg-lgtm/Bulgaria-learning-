import React, { useState } from 'react';
import { Search, Book } from 'lucide-react';

export const DictionaryTab: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/dictionary/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error('Dictionary search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center">
            <Book className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Bulgarian Dictionary</h2>
            <p className="text-xs text-slate-500">Search for words from "The Bulgarian Language in Practice"</p>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search word (Bulgarian or English)..."
            className="flex-1 px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-4 py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            {isLoading ? 'Searching...' : <Search className="w-4 h-4" />}
          </button>
        </div>

        <div className="space-y-2">
          {results.length > 0 ? (
            results.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-lg text-sky-700">{item.bg}</span>
                <span className="text-slate-500 mx-2">—</span>
                <span className="text-slate-700">{item.en}</span>
              </div>
            ))
          ) : query && !isLoading ? (
            <p className="text-center text-slate-500 text-sm py-4">No results found.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
