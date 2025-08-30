import { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { AppProvider } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PersonalizationProvider } from './components/personalization/PersonalizationEngine';
import Layout from './components/Layout';
import Router, { Route } from './components/Router';
import { updateSEO, seoData } from './utils/seo';
import { analytics } from './utils/analytics';
import { Toaster } from 'sonner';

const PerformanceMonitor = () => {
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          analytics.trackEvent({
            action: 'performance_metric',
            category: 'performance',
            label: entry.name
          });
        });
      });
      observer.observe({ entryTypes: ['measure', 'navigation'] });
    }
  }, []);
  return null;
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');

  useEffect(() => {
    // Initialize analytics
    analytics.init();
    analytics.trackPerformance();
    
    // Update SEO for current route
    const seo = seoData[currentRoute as keyof typeof seoData] || seoData.home;
    updateSEO(seo);
    
    // Preload critical resources
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    
    // Set up error reporting
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      analytics.trackEvent({
        action: 'javascript_error',
        category: 'error',
        label: event.error?.message || 'Unknown error'
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      analytics.trackEvent({
        action: 'promise_rejection',
        category: 'error',
        label: event.reason?.message || 'Unknown rejection'
      });
    });
  }, []);

  useEffect(() => {
    // Update SEO when route changes
    const seo = seoData[currentRoute as keyof typeof seoData] || seoData.home;
    updateSEO(seo);
  }, [currentRoute]);

  const handleNavigate = (route: Route) => {
    setCurrentRoute(route);
    
    // Track navigation
    analytics.trackEvent({
      action: 'navigation',
      category: 'user_interaction',
      label: route
    });
    
    // Smooth scroll to top
    const scrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      ? 'auto' 
      : 'smooth';
    
    window.scrollTo({ top: 0, behavior: scrollBehavior });
  };

  const content = (
    <Layout currentRoute={currentRoute} onNavigate={handleNavigate}>
      <Router currentRoute={currentRoute} onNavigate={handleNavigate} />
    </Layout>
  );

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <PersonalizationProvider>
          <AppProvider>
            {content}
          </AppProvider>
        </PersonalizationProvider>
      </ThemeProvider>
      <Toaster />
      <PerformanceMonitor />
    </ErrorBoundary>
  );
}