import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { useDebounce } from '../hooks/useDebounce';
import { Search, FileText, Briefcase, Users, MessageSquare } from 'lucide-react';
import { Route } from './Router';

interface SearchResult {
  id: string;
  type: 'page' | 'service' | 'blog' | 'portfolio';
  title: string;
  description: string;
  route: Route;
  icon: React.ComponentType<{ className?: string }>;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (route: Route) => void;
}

export function SearchDialog({ open, onOpenChange, onNavigate }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  // Mock search data
  const searchData: SearchResult[] = [
    {
      id: '1',
      type: 'page',
      title: 'Home',
      description: 'Main homepage with our services and company information',
      route: 'home',
      icon: MessageSquare
    },
    {
      id: '2',
      type: 'page',
      title: 'About Us',
      description: 'Learn about Kaizen Digital Solutions and our team',
      route: 'about',
      icon: Users
    },
    {
      id: '3',
      type: 'service',
      title: 'Website Development',
      description: 'Custom web applications built with modern technologies',
      route: 'services',
      icon: Briefcase
    },
    {
      id: '4',
      type: 'service',
      title: 'Mobile App Development',
      description: 'iOS and Android applications for your business',
      route: 'services',
      icon: Briefcase
    },
    {
      id: '5',
      type: 'service',
      title: 'Digital Marketing',
      description: 'Strategic marketing solutions to grow your online presence',
      route: 'services',
      icon: Briefcase
    },
    {
      id: '6',
      type: 'service',
      title: 'DigEd',
      description: 'Digital education programs and training',
      route: 'diged',
      icon: Briefcase
    },
    {
      id: '7',
      type: 'page',
      title: 'Portfolio',
      description: 'View our completed projects and case studies',
      route: 'portfolio',
      icon: FileText
    },
    {
      id: '8',
      type: 'page',
      title: 'Blog',
      description: 'Latest insights and updates from our team',
      route: 'blog',
      icon: FileText
    },
    {
      id: '9',
      type: 'page',
      title: 'Contact',
      description: 'Get in touch with our team',
      route: 'contact',
      icon: MessageSquare
    },
    {
      id: '10',
      type: 'page',
      title: 'Allen AI',
      description: 'Chat with our AI assistant for instant help',
      route: 'allen',
      icon: MessageSquare
    }
  ];

  useEffect(() => {
    if (debouncedQuery.length === 0) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    const timer = setTimeout(() => {
      const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      
      setResults(filteredResults);
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  const handleResultClick = (route: Route) => {
    onNavigate(route);
    onOpenChange(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0" onKeyDown={handleKeyDown}>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search pages, services, and content..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          <div className="mt-4 max-h-96 overflow-y-auto">
            {isSearching && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            )}

            {!isSearching && query && results.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No results found for "{query}"
              </div>
            )}

            {!isSearching && results.length > 0 && (
              <div className="space-y-2">
                {results.map((result) => (
                  <Card
                    key={result.id}
                    className="cursor-pointer hover:bg-accent/50 transition-colors border-border"
                    onClick={() => handleResultClick(result.route)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <result.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-foreground">{result.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {result.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md capitalize">
                              {result.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!query && (
              <div className="py-8 text-center text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Start typing to search our website</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}