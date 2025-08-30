// Enhanced monitoring and error tracking utilities

interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  lineNumber?: number;
  columnNumber?: number;
  timestamp: Date;
  userAgent: string;
  userId?: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: Date;
  url: string;
}

class Monitoring {
  private errorQueue: ErrorReport[] = [];
  private performanceQueue: PerformanceMetric[] = [];
  private isOnline = navigator.onLine;
  private maxQueueSize = 100;

  constructor() {
    this.initializeErrorHandling();
    this.initializePerformanceMonitoring();
    this.initializeNetworkHandling();
  }

  private initializeErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.reportError({
        message: event.message,
        stack: event.error?.stack,
        url: window.location.href,
        lineNumber: event.lineno,
        columnNumber: event.colno
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href
      });
    });

    // React error boundary fallback
    window.addEventListener('react-error', ((event: CustomEvent) => {
      this.reportError({
        message: event.detail.error.message,
        stack: event.detail.error.stack,
        url: window.location.href
      });
    }) as EventListener);
  }

  private initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      // Wait a bit for all resources to load
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        this.reportPerformance('page_load_time', perfData.loadEventEnd - perfData.fetchStart);
        this.reportPerformance('dom_content_loaded', perfData.domContentLoadedEventEnd - perfData.fetchStart);
        this.reportPerformance('first_byte', perfData.responseStart - perfData.requestStart);
      }, 1000);
    });

    // Monitor resource loading
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          
          // Report slow resources
          if (resourceEntry.duration > 1000) {
            this.reportPerformance('slow_resource', resourceEntry.duration);
          }
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  private initializeNetworkHandling() {
    // Monitor online/offline status
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushQueues();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  reportError(error: Omit<ErrorReport, 'timestamp' | 'userAgent'>) {
    const errorReport: ErrorReport = {
      ...error,
      timestamp: new Date(),
      userAgent: navigator.userAgent
    };

    // Add to queue
    this.errorQueue.push(errorReport);
    
    // Trim queue if it gets too large
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue = this.errorQueue.slice(-this.maxQueueSize);
    }

    // Try to send immediately if online
    if (this.isOnline) {
      this.sendErrors();
    }

    // Log to console for development
    console.error('Error reported:', errorReport);
  }

  reportPerformance(name: string, value: number) {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: new Date(),
      url: window.location.href
    };

    this.performanceQueue.push(metric);
    
    if (this.performanceQueue.length > this.maxQueueSize) {
      this.performanceQueue = this.performanceQueue.slice(-this.maxQueueSize);
    }

    if (this.isOnline) {
      this.sendPerformanceMetrics();
    }

    console.log('Performance metric:', metric);
  }

  private async sendErrors() {
    if (this.errorQueue.length === 0) return;

    try {
      // In a real implementation, this would send to your error tracking service
      const response = await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ errors: this.errorQueue })
      });

      if (response.ok) {
        this.errorQueue = [];
      }
    } catch (error) {
      console.warn('Failed to send error reports:', error);
    }
  }

  private async sendPerformanceMetrics() {
    if (this.performanceQueue.length === 0) return;

    try {
      const response = await fetch('/api/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metrics: this.performanceQueue })
      });

      if (response.ok) {
        this.performanceQueue = [];
      }
    } catch (error) {
      console.warn('Failed to send performance metrics:', error);
    }
  }

  private flushQueues() {
    this.sendErrors();
    this.sendPerformanceMetrics();
  }

  // User interaction tracking
  trackUserInteraction(interaction: {
    type: string;
    element: string;
    value?: string;
    timestamp?: Date;
  }) {
    const event = {
      ...interaction,
      timestamp: interaction.timestamp || new Date(),
      url: window.location.href
    };

    console.log('User interaction:', event);
    
    // In a real implementation, this would be sent to analytics
  }

  // Feature usage tracking
  trackFeatureUsage(feature: string, metadata?: Record<string, any>) {
    const event = {
      feature,
      metadata,
      timestamp: new Date(),
      url: window.location.href
    };

    console.log('Feature usage:', event);
  }

  // A/B test tracking
  trackExperiment(experimentName: string, variant: string, converted: boolean = false) {
    const event = {
      experimentName,
      variant,
      converted,
      timestamp: new Date(),
      url: window.location.href
    };

    console.log('Experiment tracking:', event);
  }
}

export const monitoring = new Monitoring();

// React Error Boundary helper
export function reportReactError(error: Error, errorInfo: any) {
  const event = new CustomEvent('react-error', {
    detail: { error, errorInfo }
  });
  window.dispatchEvent(event);
}