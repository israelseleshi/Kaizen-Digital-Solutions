import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Clock, TrendingUp, Tag, Calendar } from 'lucide-react';
import Fuse from 'fuse.js';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { MotionBox, StaggerContainer } from '../animations/MotionComponents';
import { PremiumHoverCard } from '../animations/MicroInteractions';
import { analytics } from '../../utils/analytics';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  lastModified: Date;
  popularity: number;
  type: 'page' | 'service' | 'content' | 'resource';
}

interface SearchFilters {
  categories: string[];
  types: string[];
  dateRange: string;
  sortBy: string;
  tags: string[];
}

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  searchItems: SearchItem[];
}

const SEARCH_CATEGORIES = [
  'Services', 'About', 'Portfolio', 'Resources', 'Contact', 'Blog'
];

const CONTENT_TYPES = [
  'page', 'service', 'content', 'resource'
];

const DATE_RANGES = [
  { value: 'all', label: 'All Time' },
  { value: 'week', label: 'Past Week' },
  { value: 'month', label: 'Past Month' },
  { value: 'quarter', label: 'Past Quarter' },
  { value: 'year', label: 'Past Year' }
];

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'alphabetical', label: 'Alphabetical' }
];

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  isOpen,
  onClose,
  searchItems
}) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    types: [],
    dateRange: 'all',
    sortBy: 'relevance',
    tags: []
  });
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches] = useState(['Digital Solutions', 'Web Development', 'AI Integration', 'Cloud Services']);
  const [searchHistory, setSearchHistory] = useState<Array<{ query: string; timestamp: Date; results: number }>>([]);

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    const options = {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'tags', weight: 0.2 },
        { name: 'category', weight: 0.1 }
      ],
      threshold: 0.3,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      shouldSort: true,
      findAllMatches: true
    };
    return new Fuse(searchItems, options);
  }, [searchItems]);

  // Load search history and recent searches
  useEffect(() => {
    const savedHistory = localStorage.getItem('search-history');
    const savedRecent = localStorage.getItem('recent-searches');
    
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.warn('Failed to load search history:', error);
      }
    }
    
    if (savedRecent) {
      try {
        setRecentSearches(JSON.parse(savedRecent));
      } catch (error) {
        console.warn('Failed to load recent searches:', error);
      }
    }
  }, []);

  // Perform search with filters
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    let results = fuse.search(query).map(result => ({
      ...result.item,
      score: result.score || 0,
      matches: result.matches || []
    }));

    // Apply filters
    if (filters.categories.length > 0) {
      results = results.filter(item => filters.categories.includes(item.category));
    }

    if (filters.types.length > 0) {
      results = results.filter(item => filters.types.includes(item.type));
    }

    if (filters.tags.length > 0) {
      results = results.filter(item => 
        filters.tags.some(tag => item.tags.includes(tag))
      );
    }

    // Apply date filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (filters.dateRange) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          cutoffDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      results = results.filter(item => item.lastModified >= cutoffDate);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'popularity':
        results.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'recent':
        results.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
        break;
      case 'alphabetical':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // relevance
        results.sort((a, b) => a.score - b.score);
    }

    return results;
  }, [query, filters, fuse]);

  // Handle search submission
  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Track search analytics
    analytics.trackEvent({
      action: 'search_performed',
      category: 'search',
      label: query,
      customParameters: {
        resultsCount: searchResults.length,
        filters: Object.values(filters).some(f => 
          Array.isArray(f) ? f.length > 0 : f !== 'all' && f !== 'relevance'
        ),
        timestamp: new Date().toISOString()
      }
    });

    // Update search history
    const newHistoryItem = {
      query: searchQuery,
      timestamp: new Date(),
      results: searchResults.length
    };
    
    const updatedHistory = [newHistoryItem, ...searchHistory.slice(0, 9)];
    setSearchHistory(updatedHistory);
    localStorage.setItem('search-history', JSON.stringify(updatedHistory));

    // Update recent searches
    const updatedRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem('recent-searches', JSON.stringify(updatedRecent));
  };

  // Handle filter changes
  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'categories' | 'types' | 'tags', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      categories: [],
      types: [],
      dateRange: 'all',
      sortBy: 'relevance',
      tags: []
    });
  };

  // Get all available tags
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    searchItems.forEach(item => {
      item.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [searchItems]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-4 md:inset-8 lg:inset-16 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Search className="w-6 h-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Advanced Search
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex h-[calc(100%-5rem)]">
            {/* Filters Sidebar */}
            <div className="w-80 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Quick Actions */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="w-full justify-start"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Clear All Filters
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Categories */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {SEARCH_CATEGORIES.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={filters.categories.includes(category)}
                          onCheckedChange={() => toggleArrayFilter('categories', category)}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Content Types */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Content Types
                  </h3>
                  <div className="space-y-2">
                    {CONTENT_TYPES.map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={filters.types.includes(type)}
                          onCheckedChange={() => toggleArrayFilter('types', type)}
                        />
                        <label
                          htmlFor={`type-${type}`}
                          className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer capitalize"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Date Range */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Date Range
                  </h3>
                  <Select
                    value={filters.dateRange}
                    onValueChange={(value) => updateFilter('dateRange', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DATE_RANGES.map(range => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Sort By */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Sort By
                  </h3>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) => updateFilter('sortBy', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Tags */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {availableTags.slice(0, 20).map(tag => (
                      <Badge
                        key={tag}
                        variant={filters.tags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer text-xs"
                        onClick={() => toggleArrayFilter('tags', tag)}
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Search Area */}
            <div className="flex-1 flex flex-col">
              {/* Search Input */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for services, content, resources..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
                    className="pl-10 pr-4 py-3 text-lg"
                    autoFocus
                  />
                </div>

                {/* Quick Suggestions */}
                {!query && (
                  <div className="mt-4 space-y-3">
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <Clock className="w-4 h-4 mr-1" />
                          Recent Searches
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="cursor-pointer"
                              onClick={() => setQuery(search)}
                            >
                              {search}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Trending Searches
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((search, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => {
                              analytics.trackEvent({
                                action: 'search_suggestion_clicked',
                                category: 'search',
                                label: search,
                                customParameters: {
                                  type: 'trending',
                                  timestamp: new Date().toISOString()
                                }
                              });
                              setQuery(search);
                            }}
                          >
                            {search}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Results */}
              <ScrollArea className="flex-1 p-6">
                {query && (
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {searchResults.length} results for "{query}"
                    </p>
                    <div className="flex items-center space-x-2">
                      {Object.values(filters).some(f => 
                        Array.isArray(f) ? f.length > 0 : f !== 'all' && f !== 'relevance'
                      ) && (
                        <Badge variant="secondary" className="text-xs">
                          Filters Applied
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <StaggerContainer className="space-y-4">
                  {searchResults.map((result, index) => (
                    <MotionBox
                      key={result.id}
                      variant="fadeInUp"
                      delay={index * 0.05}
                    >
                      <PremiumHoverCard className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {result.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                              {result.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {result.lastModified.toLocaleDateString()}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {result.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs capitalize">
                                {result.type}
                              </Badge>
                            </div>
                            {result.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {result.tags.slice(0, 5).map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              analytics.trackEvent({
                                action: 'search_result_clicked',
                                category: 'search',
                                label: result.title,
                                customParameters: {
                                  position: index + 1,
                                  timestamp: new Date().toISOString()
                                }
                              });
                              window.location.href = result.url;
                            }}
                          >
                            View
                          </Button>
                        </div>
                      </PremiumHoverCard>
                    </MotionBox>
                  ))}
                </StaggerContainer>

                {query && searchResults.length === 0 && (
                  <MotionBox variant="fadeInUp" className="text-center py-12">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Try adjusting your search terms or filters
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </MotionBox>
                )}
              </ScrollArea>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
