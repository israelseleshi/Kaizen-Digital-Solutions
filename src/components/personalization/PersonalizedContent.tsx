import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, TrendingUp, Clock, Star, ArrowRight, Sparkles } from 'lucide-react';
import { usePersonalization } from './PersonalizationEngine';
import { MotionBox, StaggerContainer } from '../animations/MotionComponents';
import { PremiumHoverCard, GradientText } from '../animations/MicroInteractions';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

// Personalized greeting component
export const PersonalizedGreeting: React.FC<{ className?: string }> = ({ className }) => {
  const { personalizedGreeting, isReturningUser } = usePersonalization();

  return (
    <MotionBox variant="fadeInUp" className={className}>
      <div className="flex items-center space-x-3">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-6 h-6 text-emerald-600" />
        </motion.div>
        <div>
          <GradientText className="text-2xl md:text-3xl font-bold">
            {personalizedGreeting}
          </GradientText>
          {isReturningUser && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Welcome back! We've personalized your experience.
            </p>
          )}
        </div>
      </div>
    </MotionBox>
  );
};

// Personalized service recommendations
export const PersonalizedServices: React.FC<{ className?: string }> = ({ className }) => {
  const { getPersonalizedContent, trackBehavior, userSegment } = usePersonalization();
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const personalizedServices = getPersonalizedContent('services');
    setServices(personalizedServices.slice(0, 3)); // Show top 3
  }, [getPersonalizedContent]);

  const handleServiceClick = (service: any) => {
    trackBehavior('service_interest', { service: service.name, segment: userSegment });
  };

  return (
    <div className={className}>
      <MotionBox variant="fadeInUp" delay={0.2}>
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recommended for You
          </h3>
          <Badge variant="secondary" className="text-xs">
            {userSegment.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
      </MotionBox>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <MotionBox key={service.id} variant="scaleIn" delay={index * 0.1}>
            <PremiumHoverCard className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {service.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Tailored for {userSegment.replace('_', ' ')} like you
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleServiceClick(service)}
                  className="w-full"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </PremiumHoverCard>
          </MotionBox>
        ))}
      </StaggerContainer>
    </div>
  );
};

// User insights dashboard
export const UserInsights: React.FC<{ className?: string }> = ({ className }) => {
  const { preferences } = usePersonalization();
  const { behaviorData, visitedPages, interests } = preferences;

  const insights = [
    {
      icon: Clock,
      label: 'Time Spent',
      value: `${Math.round(behaviorData.totalTimeSpent / 60000)}m`,
      description: 'Total time on site'
    },
    {
      icon: User,
      label: 'Sessions',
      value: behaviorData.sessionCount.toString(),
      description: 'Number of visits'
    },
    {
      icon: TrendingUp,
      label: 'Engagement',
      value: `${Math.round((visitedPages.length / behaviorData.sessionCount) * 100)}%`,
      description: 'Pages per session'
    }
  ];

  return (
    <div className={className}>
      <MotionBox variant="fadeInUp">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Your Activity
        </h3>
      </MotionBox>

      <StaggerContainer className="grid grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <MotionBox key={insight.label} variant="scaleIn" delay={index * 0.1}>
            <PremiumHoverCard className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <insight.icon className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {insight.value}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {insight.description}
              </div>
            </PremiumHoverCard>
          </MotionBox>
        ))}
      </StaggerContainer>

      {interests.length > 0 && (
        <MotionBox variant="fadeInUp" delay={0.4} className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Your Interests
          </h4>
          <div className="flex flex-wrap gap-2">
            {interests.map(interest => (
              <Badge key={interest} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
          </div>
        </MotionBox>
      )}
    </div>
  );
};

// Personalized recommendations widget
export const RecommendationsWidget: React.FC<{ className?: string }> = ({ className }) => {
  const { getRecommendations, trackBehavior } = usePersonalization();
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    setRecommendations(getRecommendations());
  }, [getRecommendations]);

  const handleRecommendationClick = (recommendation: string) => {
    trackBehavior('recommendation_clicked', { recommendation });
  };

  if (recommendations.length === 0) return null;

  return (
    <MotionBox variant="slideInFromBottom" className={className}>
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recommended for You
          </h3>
        </div>
        
        <StaggerContainer className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <MotionBox key={index} variant="fadeInLeft" delay={index * 0.1}>
              <PremiumHoverCard className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {recommendation}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRecommendationClick(recommendation)}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </PremiumHoverCard>
            </MotionBox>
          ))}
        </StaggerContainer>
      </div>
    </MotionBox>
  );
};

// Adaptive content based on user behavior
export const AdaptiveContent: React.FC<{
  children: React.ReactNode;
  contentType: string;
  fallback?: React.ReactNode;
  className?: string;
}> = ({ children, contentType, fallback, className }) => {
  const { preferences } = usePersonalization();
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    const { contentPreferences } = preferences;
    
    // Determine if content should be shown based on user preferences
    switch (contentType) {
      case 'case-studies':
        setShouldShow(contentPreferences.showCaseStudies);
        break;
      case 'technical-details':
        setShouldShow(contentPreferences.showTechnicalDetails);
        break;
      case 'pricing':
        setShouldShow(contentPreferences.showPricing);
        break;
      default:
        setShouldShow(true);
    }
  }, [preferences, contentType]);

  if (!shouldShow) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  return (
    <MotionBox variant="fadeInUp" className={className}>
      {children}
    </MotionBox>
  );
};

// Smart content length adapter
export const SmartContent: React.FC<{
  shortContent: React.ReactNode;
  mediumContent: React.ReactNode;
  longContent: React.ReactNode;
  className?: string;
}> = ({ shortContent, mediumContent, longContent, className }) => {
  const { preferences } = usePersonalization();
  const { preferredContentLength } = preferences.contentPreferences;

  const contentMap = {
    short: shortContent,
    medium: mediumContent,
    long: longContent
  };

  return (
    <MotionBox variant="fadeInUp" className={className}>
      {contentMap[preferredContentLength]}
    </MotionBox>
  );
};

// Personalized CTA based on user segment
export const PersonalizedCTA: React.FC<{ className?: string }> = ({ className }) => {
  const { userSegment, trackBehavior } = usePersonalization();


  const getCTAContent = () => {
    switch (userSegment) {
      case 'new_user':
        return {
          title: 'Start Your Digital Journey',
          description: 'Discover how we can transform your business processes',
          buttonText: 'Explore Services',
          action: '/services'
        };
      case 'high_value_prospect':
        return {
          title: 'Ready to Get Started?',
          description: 'Let\'s discuss your project requirements',
          buttonText: 'Schedule Consultation',
          action: '/contact'
        };
      case 'technical_user':
        return {
          title: 'Dive into Technical Details',
          description: 'Explore our technical capabilities and case studies',
          buttonText: 'View Portfolio',
          action: '/portfolio'
        };
      case 'business_user':
        return {
          title: 'Transform Your Business',
          description: 'See how we\'ve helped businesses like yours',
          buttonText: 'View Case Studies',
          action: '/case-studies'
        };
      default:
        return {
          title: 'Let\'s Work Together',
          description: 'Ready to take your business to the next level?',
          buttonText: 'Get Started',
          action: '/contact'
        };
    }
  };

  const cta = getCTAContent();

  const handleCTAClick = () => {
    trackBehavior('cta_clicked', { 
      segment: userSegment, 
      cta_type: cta.title,
      target: cta.action 
    });
    window.location.href = cta.action;
  };

  return (
    <MotionBox variant="scaleIn" className={className}>
      <PremiumHoverCard className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-8 text-center">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-8 h-8 mx-auto mb-4 opacity-80" />
        </motion.div>
        
        <GradientText 
          className="text-2xl font-bold mb-3"
          colors={['#ffffff', '#f0fdf4', '#ffffff']}
        >
          {cta.title}
        </GradientText>
        
        <p className="text-emerald-100 mb-6 text-lg">
          {cta.description}
        </p>
        
        <Button
          onClick={handleCTAClick}
          className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-lg"
        >
          {cta.buttonText}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </PremiumHoverCard>
    </MotionBox>
  );
};

// Dynamic content sections based on user interests
export const DynamicContentSections: React.FC<{ className?: string }> = ({ className }) => {
  const { preferences, getPersonalizedContent, userSegment } = usePersonalization();
  const [contentSections, setContentSections] = useState<Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    priority: number;
  }>>([]);

  useEffect(() => {
    // Generate content sections based on user data
    const sections: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      priority: number;
    }> = [];
    
    if (preferences.interests.includes('AI')) {
      sections.push({
        id: 'ai-solutions',
        title: 'AI-Powered Solutions',
        description: 'Leverage artificial intelligence to transform your business processes',
        icon: '🤖',
        priority: 1
      });
    }
    
    if (preferences.interests.includes('Cloud')) {
      sections.push({
        id: 'cloud-services',
        title: 'Cloud Infrastructure',
        description: 'Scalable cloud solutions for modern businesses',
        icon: '☁️',
        priority: 2
      });
    }
    
    if (userSegment === 'business_user') {
      sections.push({
        id: 'business-strategy',
        title: 'Digital Strategy',
        description: 'Strategic consulting to accelerate your digital transformation',
        icon: '📈',
        priority: 3
      });
    }
    
    // Sort by priority and user relevance
    sections.sort((a, b) => a.priority - b.priority);
    setContentSections(sections.slice(0, 4));
  }, [preferences, userSegment, getPersonalizedContent]);

  if (contentSections.length === 0) return null;

  return (
    <div className={className}>
      <MotionBox variant="fadeInUp">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Tailored Content for You
        </h3>
      </MotionBox>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contentSections.map((section, index) => (
          <MotionBox key={section.id} variant="fadeInUp" delay={index * 0.1}>
            <PremiumHoverCard className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{section.icon}</div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {section.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {section.description}
                  </p>
                  <Button variant="outline" size="sm">
                    Explore
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </PremiumHoverCard>
          </MotionBox>
        ))}
      </StaggerContainer>
    </div>
  );
};

// Personalized testimonials
export const PersonalizedTestimonials: React.FC<{ className?: string }> = ({ className }) => {
  const { getPersonalizedContent, userSegment } = usePersonalization();
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const personalizedTestimonials = getPersonalizedContent('testimonials');
    setTestimonials(personalizedTestimonials.slice(0, 2));
  }, [getPersonalizedContent]);

  if (testimonials.length === 0) return null;

  return (
    <div className={className}>
      <MotionBox variant="fadeInUp">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          What {userSegment.replace('_', ' ')}s Say About Us
        </h3>
      </MotionBox>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <MotionBox key={testimonial.id} variant="fadeInUp" delay={index * 0.2}>
            <PremiumHoverCard className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {testimonial.author || 'Verified Client'}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {testimonial.company || 'Enterprise Client'}
                  </div>
                </div>
              </div>
            </PremiumHoverCard>
          </MotionBox>
        ))}
      </StaggerContainer>
    </div>
  );
};
