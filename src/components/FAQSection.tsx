import { useState, useMemo } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { Search, MessageCircle, Clock, DollarSign, Code } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { analytics } from '../utils/analytics';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'pricing' | 'timeline' | 'process';
  keywords: string[];
}

const faqs: FAQ[] = [
  {
    id: 'services-overview',
    question: 'What digital services does Kaizen Digital Solutions offer?',
    answer: 'We offer a comprehensive range of digital services including custom website development, mobile app development, digital marketing and SEO, custom software solutions, DigEd programs, and digital transformation consulting. Our team specializes in modern technologies and frameworks to deliver cutting-edge solutions.',
    category: 'general',
    keywords: ['services', 'development', 'marketing', 'software', 'diged']
  },
  {
    id: 'project-timeline',
    question: 'How long does a typical project take to complete?',
    answer: 'Project timelines vary depending on complexity and scope. Simple websites typically take 2-4 weeks, while complex web applications can take 2-6 months. Mobile apps usually require 3-8 months. We provide detailed timelines during our initial consultation and keep you updated throughout the process.',
    category: 'timeline',
    keywords: ['timeline', 'duration', 'completion', 'schedule']
  },
  {
    id: 'pricing-model',
    question: 'How do you determine project pricing?',
    answer: 'Our pricing is based on project complexity, required features, timeline, and ongoing support needs. We offer both fixed-price and hourly billing options. After understanding your requirements, we provide a detailed quote with transparent pricing. Most projects range from $5,000 to $100,000+.',
    category: 'pricing',
    keywords: ['pricing', 'cost', 'quote', 'budget', 'payment']
  },
  {
    id: 'technologies',
    question: 'What technologies do you work with?',
    answer: 'We work with modern technologies including React, Next.js, Node.js, Python, TypeScript, AWS, Google Cloud, React Native, Flutter, and many others. We stay current with industry trends and choose the best technology stack for each project\'s specific needs.',
    category: 'technical',
    keywords: ['technologies', 'react', 'nodejs', 'python', 'aws', 'mobile']
  },
  {
    id: 'support-maintenance',
    question: 'Do you provide ongoing support and maintenance?',
    answer: 'Yes, we offer comprehensive support and maintenance packages. This includes regular updates, security patches, performance monitoring, backup management, and technical support. We have different tiers of support to match your needs and budget.',
    category: 'general',
    keywords: ['support', 'maintenance', 'updates', 'security']
  },
  {
    id: 'project-process',
    question: 'What is your development process?',
    answer: 'We follow an agile development methodology with regular milestones and client feedback. Our process includes: 1) Discovery and planning, 2) Design and prototyping, 3) Development and testing, 4) Deployment and launch, 5) Ongoing support. You\'ll have regular check-ins and can track progress throughout.',
    category: 'process',
    keywords: ['process', 'methodology', 'agile', 'development', 'phases']
  },
  {
    id: 'communication',
    question: 'How do you communicate with clients during projects?',
    answer: 'We maintain transparent communication through regular video calls, email updates, project management tools, and a dedicated client portal. You\'ll have direct access to your project manager and can track progress in real-time. We typically have weekly check-ins for active projects.',
    category: 'process',
    keywords: ['communication', 'updates', 'meetings', 'portal', 'manager']
  },
  {
    id: 'diged-program',
    question: 'What is the DigEd program?',
    answer: 'DigEd is our digital education initiative that offers training programs, workshops, and courses on digital transformation, modern technologies, and business digitization. It\'s designed for professionals and businesses looking to enhance their digital skills and understanding.',
    category: 'general',
    keywords: ['diged', 'education', 'training', 'workshops', 'learning']
  },
  {
    id: 'geographic-coverage',
    question: 'Do you work with clients globally?',
    answer: 'Yes, we work with clients worldwide. While we\'re based in [Location], we have successfully delivered projects for clients across different time zones. We use modern collaboration tools and have processes in place to ensure smooth communication regardless of location.',
    category: 'general',
    keywords: ['global', 'international', 'remote', 'worldwide', 'location']
  },
  {
    id: 'minimum-project',
    question: 'Do you have a minimum project size?',
    answer: 'We work on projects of various sizes, but typically our minimum engagement is around $5,000. For smaller needs, we recommend checking out our DigEd resources or consulting services. We believe in providing value regardless of project size and will be transparent about what we can deliver within your budget.',
    category: 'pricing',
    keywords: ['minimum', 'small', 'budget', 'engagement', 'size']
  }
];

const categoryIcons = {
  general: MessageCircle,
  technical: Code,
  pricing: DollarSign,
  timeline: Clock,
  process: MessageCircle
};

const categoryColors = {
  general: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  technical: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  pricing: 'bg-green-100 text-green-800 hover:bg-green-200',
  timeline: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  process: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
};

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<string[]>([]);
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let filtered = faqs;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search query
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );

      // Track search
      analytics.trackEvent({
        action: 'faq_search',
        category: 'user_interaction',
        label: debouncedSearch
      });
    }

    return filtered;
  }, [debouncedSearch, selectedCategory]);

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const handleCategoryFilter = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
      analytics.trackEvent({
        action: 'faq_category_filter',
        category: 'user_interaction',
        label: category
      });
    }
  };

  const handleAccordionChange = (value: string[]) => {
    setOpenItems(value);
    
    // Track which FAQ was opened
    const newlyOpened = value.find(item => !openItems.includes(item));
    if (newlyOpened) {
      const faq = faqs.find(f => f.id === newlyOpened);
      if (faq) {
        analytics.trackEvent({
          action: 'faq_opened',
          category: 'user_interaction',
          label: faq.question
        });
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search frequently asked questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            const isSelected = selectedCategory === category;
            
            return (
              <Badge
                key={category}
                variant="outline"
                className={`cursor-pointer transition-colors capitalize ${
                  isSelected 
                    ? categoryColors[category as keyof typeof categoryColors]
                    : 'hover:bg-accent'
                }`}
                onClick={() => handleCategoryFilter(category)}
              >
                <Icon className="w-3 h-3 mr-1" />
                {category}
                <span className="ml-1 text-xs">
                  ({faqs.filter(faq => faq.category === category).length})
                </span>
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredFAQs.length} of {faqs.length} questions
        {selectedCategory && (
          <span> in <span className="capitalize font-medium">{selectedCategory}</span></span>
        )}
        {debouncedSearch && (
          <span> matching "<span className="font-medium">{debouncedSearch}</span>"</span>
        )}
      </div>

      {/* FAQ Accordion */}
      {filteredFAQs.length > 0 ? (
        <Accordion 
          type="multiple" 
          value={openItems}
          onValueChange={handleAccordionChange}
          className="space-y-2"
        >
          {filteredFAQs.map((faq) => {
            const Icon = categoryIcons[faq.category];
            
            return (
              <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-accent/50 rounded-t-lg">
                  <div className="flex items-start gap-3 text-left">
                    <div className={`p-2 rounded-md ${categoryColors[faq.category]} flex-shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="ml-11">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {faq.answer}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {faq.keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No questions found</h3>
            <p className="text-muted-foreground">
              {debouncedSearch || selectedCategory
                ? 'Try adjusting your search or filter criteria'
                : 'No frequently asked questions available'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}