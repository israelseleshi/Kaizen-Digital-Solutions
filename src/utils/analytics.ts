// Analytics and conversion tracking utilities

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

interface ConversionEvent {
  type: 'form_submission' | 'contact_request' | 'service_inquiry' | 'diged_registration' | 'chat_interaction';
  details: Record<string, any>;
}

class Analytics {
  private isInitialized = false;

  init() {
    if (typeof window === 'undefined') return;
    
    // Initialize Google Analytics (placeholder for real implementation)
    if (!this.isInitialized) {
      this.loadGoogleAnalytics();
      this.initializeDataLayer();
      this.isInitialized = true;
    }
  }

  private loadGoogleAnalytics() {
    // Placeholder - in real implementation, load GA script
    console.log('Analytics initialized');
  }

  private initializeDataLayer() {
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
    }
  }

  trackEvent(event: AnalyticsEvent) {
    if (typeof window === 'undefined') return;

    // Send to Google Analytics
    this.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.customParameters
    });

    // Log for development
    console.log('Analytics Event:', event);
  }

  trackPageView(page: string, title?: string) {
    if (typeof window === 'undefined') return;

    this.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: title,
      page_location: window.location.href,
      page_path: page
    });

    console.log('Page View:', { page, title });
  }

  trackConversion(event: ConversionEvent) {
    // Track important business conversions
    this.trackEvent({
      action: 'conversion',
      category: event.type,
      label: JSON.stringify(event.details),
      value: this.getConversionValue(event.type)
    });

    // Send to conversion tracking (Google Ads, Facebook Pixel, etc.)
    this.trackGoogleAdsConversion(event);
    this.trackFacebookConversion(event);
  }

  private getConversionValue(type: ConversionEvent['type']): number {
    const values = {
      'form_submission': 10,
      'contact_request': 25,
      'service_inquiry': 50,
      'diged_registration': 30,
      'chat_interaction': 5
    };
    return values[type] || 0;
  }

  private trackGoogleAdsConversion(event: ConversionEvent) {
    // Placeholder for Google Ads conversion tracking
    console.log('Google Ads Conversion:', event);
  }

  private trackFacebookConversion(event: ConversionEvent) {
    // Placeholder for Facebook Pixel tracking
    console.log('Facebook Conversion:', event);
  }

  private gtag(..._args: any[]) {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push(arguments);
    }
  }

  // A/B Testing utilities
  getVariant(testName: string, variants: string[]): string {
    if (typeof window === 'undefined') return variants[0];
    
    const stored = localStorage.getItem(`ab_test_${testName}`);
    if (stored && variants.includes(stored)) {
      return stored;
    }

    // Simple random assignment
    const variant = variants[Math.floor(Math.random() * variants.length)];
    localStorage.setItem(`ab_test_${testName}`, variant);
    
    // Track the assignment
    this.trackEvent({
      action: 'ab_test_assignment',
      category: 'experimentation',
      label: `${testName}:${variant}`
    });

    return variant;
  }

  trackABTestConversion(testName: string, variant: string) {
    this.trackEvent({
      action: 'ab_test_conversion',
      category: 'experimentation',
      label: `${testName}:${variant}`
    });
  }

  // Performance monitoring
  trackPerformance() {
    if (typeof window === 'undefined' || !window.performance) return;

    // Core Web Vitals
    this.trackCoreWebVitals();
    
    // Navigation timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        this.trackEvent({
          action: 'page_load_time',
          category: 'performance',
          value: Math.round(navigation.loadEventEnd - navigation.fetchStart)
        });

        this.trackEvent({
          action: 'dom_content_loaded',
          category: 'performance',
          value: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart)
        });
      }, 0);
    });
  }

  private trackCoreWebVitals() {
    // This would integrate with web-vitals library in a real implementation
    console.log('Core Web Vitals tracking initialized');
  }

  // User engagement tracking
  trackScrollDepth() {
    if (typeof window === 'undefined') return;

    let maxScroll = 0;
    const thresholds = [25, 50, 75, 90, 100];
    
    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        const threshold = thresholds.find(t => scrollPercent >= t && maxScroll < t);
        if (threshold) {
          this.trackEvent({
            action: 'scroll_depth',
            category: 'engagement',
            label: `${threshold}%`,
            value: threshold
          });
        }
      }
    };

    window.addEventListener('scroll', trackScroll, { passive: true });
  }

  // Time on page tracking
  startTimeTracking() {
    if (typeof window === 'undefined') return;

    const startTime = Date.now();
    
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      
      this.trackEvent({
        action: 'time_on_page',
        category: 'engagement',
        value: timeSpent
      });
    };

    // Track time when user leaves the page
    window.addEventListener('beforeunload', trackTimeOnPage);
    
    // Track time at intervals for users who stay long
    const intervals = [30, 60, 120, 300]; // seconds
    intervals.forEach(interval => {
      setTimeout(() => {
        this.trackEvent({
          action: 'time_milestone',
          category: 'engagement',
          label: `${interval}s`,
          value: interval
        });
      }, interval * 1000);
    });
  }
}

export const analytics = new Analytics();