import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { analytics } from '../../utils/analytics';

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  animationSpeed: number;
  reducedMotion: boolean;
  language: string;
  timezone: string;
  interests: string[];
  visitedPages: string[];
  searchHistory: string[];
  preferredServices: string[];
  contentPreferences: {
    showCaseStudies: boolean;
    showTechnicalDetails: boolean;
    showPricing: boolean;
    preferredContentLength: 'short' | 'medium' | 'long';
  };
  behaviorData: {
    sessionCount: number;
    totalTimeSpent: number;
    averageSessionDuration: number;
    bounceRate: number;
    conversionEvents: string[];
    lastVisit: Date;
    deviceType: 'mobile' | 'tablet' | 'desktop';
    browserType: string;
  };
}

interface PersonalizationContextType {
  preferences: UserPreferences;
  updatePreference: (key: keyof UserPreferences, value: any) => void;
  trackBehavior: (event: string, data?: any) => void;
  getPersonalizedContent: (contentType: string) => any[];
  getRecommendations: () => string[];
  isReturningUser: boolean;
  userSegment: string;
  personalizedGreeting: string;
}

const defaultPreferences: UserPreferences = {
  theme: 'auto',
  animationSpeed: 1,
  reducedMotion: false,
  language: 'en',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  interests: [],
  visitedPages: [],
  searchHistory: [],
  preferredServices: [],
  contentPreferences: {
    showCaseStudies: true,
    showTechnicalDetails: false,
    showPricing: true,
    preferredContentLength: 'medium'
  },
  behaviorData: {
    sessionCount: 0,
    totalTimeSpent: 0,
    averageSessionDuration: 0,
    bounceRate: 0,
    conversionEvents: [],
    lastVisit: new Date(),
    deviceType: 'desktop',
    browserType: 'unknown'
  }
};

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export const PersonalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [sessionStartTime] = useState(Date.now());
  const [isReturningUser, setIsReturningUser] = useState(false);

  // Initialize user preferences and behavior tracking
  useEffect(() => {
    initializeUserData();
    detectDeviceAndBrowser();
    trackPageVisit();
    
    // Set up session tracking
    const handleBeforeUnload = () => {
      trackSessionEnd();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const initializeUserData = () => {
    try {
      const savedPreferences = localStorage.getItem('user-preferences');
      if (savedPreferences) {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(prev => ({
          ...prev,
          ...parsed,
          behaviorData: {
            ...prev.behaviorData,
            ...parsed.behaviorData,
            lastVisit: new Date(parsed.behaviorData?.lastVisit || Date.now())
          }
        }));
        setIsReturningUser(true);
      }
      
      // Check if user has visited before
      const hasVisited = localStorage.getItem('has-visited');
      if (hasVisited) {
        setIsReturningUser(true);
      } else {
        localStorage.setItem('has-visited', 'true');
      }
    } catch (error) {
      console.warn('Failed to load user preferences:', error);
    }
  };

  const detectDeviceAndBrowser = () => {
    const userAgent = navigator.userAgent;
    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    let browserType = 'unknown';

    // Detect device type
    if (/Mobi|Android/i.test(userAgent)) {
      deviceType = 'mobile';
    } else if (/Tablet|iPad/i.test(userAgent)) {
      deviceType = 'tablet';
    }

    // Detect browser
    if (userAgent.includes('Chrome')) browserType = 'chrome';
    else if (userAgent.includes('Firefox')) browserType = 'firefox';
    else if (userAgent.includes('Safari')) browserType = 'safari';
    else if (userAgent.includes('Edge')) browserType = 'edge';

    updatePreference('behaviorData', {
      ...preferences.behaviorData,
      deviceType,
      browserType
    });
  };

  const trackPageVisit = () => {
    const currentPage = window.location.pathname;
    const visitedPages = [...preferences.visitedPages];
    
    if (!visitedPages.includes(currentPage)) {
      visitedPages.push(currentPage);
      updatePreference('visitedPages', visitedPages.slice(-50)); // Keep last 50 pages
    }

    // Update session count
    updatePreference('behaviorData', {
      ...preferences.behaviorData,
      sessionCount: preferences.behaviorData.sessionCount + 1
    });
  };

  const trackSessionEnd = () => {
    const sessionDuration = Date.now() - sessionStartTime;
    const totalTime = preferences.behaviorData.totalTimeSpent + sessionDuration;
    const sessionCount = preferences.behaviorData.sessionCount;
    const averageDuration = totalTime / sessionCount;

    updatePreference('behaviorData', {
      ...preferences.behaviorData,
      totalTimeSpent: totalTime,
      averageSessionDuration: averageDuration,
      lastVisit: new Date()
    });
  };

  const updatePreference = useCallback((key: keyof UserPreferences, value: any) => {
    setPreferences(prev => {
      const updated = { ...prev, [key]: value };
      
      // Save to localStorage
      try {
        localStorage.setItem('user-preferences', JSON.stringify(updated));
      } catch (error) {
        console.warn('Failed to save user preferences:', error);
      }
      
      return updated;
    });
  }, []);

  const trackBehavior = useCallback((event: string, data?: any) => {
    // Track with analytics
    analytics.trackEvent({
      action: 'user_behavior',
      category: 'personalization',
      label: event,
      customParameters: {
        data,
        userSegment: getUserSegment(),
        timestamp: new Date().toISOString()
      }
    });

    // Update behavior data based on event type
    switch (event) {
      case 'conversion':
        updatePreference('behaviorData', {
          ...preferences.behaviorData,
          conversionEvents: [...preferences.behaviorData.conversionEvents, data?.type || 'unknown']
        });
        break;
      case 'service_interest':
        const services = [...preferences.preferredServices];
        if (!services.includes(data?.service)) {
          services.push(data.service);
          updatePreference('preferredServices', services.slice(-10));
        }
        break;
      case 'search':
        const searches = [...preferences.searchHistory];
        searches.push(data?.query);
        updatePreference('searchHistory', searches.slice(-20));
        break;
      case 'content_interaction':
        if (data?.interest && !preferences.interests.includes(data.interest)) {
          updatePreference('interests', [...preferences.interests, data.interest].slice(-15));
        }
        break;
    }
  }, [preferences, updatePreference]);

  const getUserSegment = useCallback((): string => {
    const { behaviorData, visitedPages, preferredServices, interests } = preferences;
    
    // New user
    if (behaviorData.sessionCount <= 2) return 'new_user';
    
    // High-value prospect
    if (behaviorData.conversionEvents.length > 0 || 
        visitedPages.includes('/contact') || 
        visitedPages.includes('/services')) {
      return 'high_value_prospect';
    }
    
    // Technical user
    if (interests.includes('AI') || interests.includes('Cloud') || 
        preferredServices.some(s => s.includes('Development'))) {
      return 'technical_user';
    }
    
    // Business user
    if (interests.includes('Strategy') || interests.includes('Consulting') ||
        visitedPages.includes('/about')) {
      return 'business_user';
    }
    
    // Returning visitor
    if (behaviorData.sessionCount > 5) return 'returning_visitor';
    
    return 'general_visitor';
  }, [preferences]);

  const getPersonalizedContent = useCallback((contentType: string) => {
    const segment = getUserSegment();
    const { contentPreferences } = preferences;
    
    // This would typically fetch from a CMS or API
    // For now, return mock personalized content based on user data
    const contentMap: Record<string, any[]> = {
      services: getPersonalizedServices(segment),
      testimonials: getPersonalizedTestimonials(segment),
      caseStudies: contentPreferences.showCaseStudies ? getPersonalizedCaseStudies() : [],
      resources: getPersonalizedResources()
    };
    
    return contentMap[contentType] || [];
  }, [preferences, getUserSegment]);

  const getPersonalizedServices = (segment: string) => {
    const allServices = [
      { id: 'web-dev', name: 'Web Development', category: 'technical' },
      { id: 'ai-integration', name: 'AI Integration', category: 'technical' },
      { id: 'cloud-solutions', name: 'Cloud Solutions', category: 'technical' },
      { id: 'digital-strategy', name: 'Digital Strategy', category: 'business' },
      { id: 'consulting', name: 'Business Consulting', category: 'business' },
      { id: 'automation', name: 'Process Automation', category: 'technical' }
    ];
    
    let prioritizedServices = [...allServices];
    
    // Prioritize based on segment
    if (segment === 'technical_user') {
      prioritizedServices.sort((a, b) => 
        a.category === 'technical' ? -1 : b.category === 'technical' ? 1 : 0
      );
    } else if (segment === 'business_user') {
      prioritizedServices.sort((a, b) => 
        a.category === 'business' ? -1 : b.category === 'business' ? 1 : 0
      );
    }
    
    return prioritizedServices;
  };

  const getPersonalizedTestimonials = (segment: string) => {
    const testimonials = [
      { id: 1, type: 'technical', content: 'Amazing technical expertise...' },
      { id: 2, type: 'business', content: 'Great business results...' },
      { id: 3, type: 'general', content: 'Professional service...' }
    ];
    
    if (segment === 'technical_user') {
      return testimonials.filter(t => t.type === 'technical' || t.type === 'general');
    } else if (segment === 'business_user') {
      return testimonials.filter(t => t.type === 'business' || t.type === 'general');
    }
    
    return testimonials;
  };

  const getPersonalizedCaseStudies = () => {
    // Return relevant case studies based on user segment
    return [];
  };

  const getPersonalizedResources = () => {
    // Return relevant resources based on interests and segment
    return [];
  };

  const getRecommendations = useCallback((): string[] => {
    const segment = getUserSegment();
    const { visitedPages, interests, preferredServices } = preferences;
    
    const recommendations: string[] = [];
    
    // Page recommendations based on segment
    if (segment === 'new_user' && !visitedPages.includes('/about')) {
      recommendations.push('Learn more about our company');
    }
    
    if (segment === 'high_value_prospect' && !visitedPages.includes('/portfolio')) {
      recommendations.push('View our portfolio');
    }
    
    if (interests.includes('AI') && !visitedPages.includes('/services')) {
      recommendations.push('Explore our AI services');
    }
    
    // Service recommendations
    if (preferredServices.length === 0) {
      recommendations.push('Discover our core services');
    }
    
    return recommendations.slice(0, 3);
  }, [preferences, getUserSegment]);

  const getPersonalizedGreeting = (): string => {
    const segment = getUserSegment();
    const timeOfDay = new Date().getHours();
    const greeting = timeOfDay < 12 ? 'Good morning' : timeOfDay < 18 ? 'Good afternoon' : 'Good evening';
    
    if (segment === 'new_user') {
      return `${greeting}! Welcome to Kaizen Digital Solutions`;
    } else if (segment === 'returning_visitor') {
      return `${greeting}! Welcome back`;
    } else if (segment === 'high_value_prospect') {
      return `${greeting}! Ready to transform your business?`;
    }
    
    return `${greeting}! How can we help you today?`;
  };

  const contextValue: PersonalizationContextType = {
    preferences,
    updatePreference,
    trackBehavior,
    getPersonalizedContent,
    getRecommendations,
    isReturningUser,
    userSegment: getUserSegment(),
    personalizedGreeting: getPersonalizedGreeting()
  };

  return (
    <PersonalizationContext.Provider value={contextValue}>
      {children}
    </PersonalizationContext.Provider>
  );
};

export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within PersonalizationProvider');
  }
  return context;
};
