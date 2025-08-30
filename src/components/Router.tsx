import { Suspense, lazy } from 'react';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ClientDashboard = lazy(() => import('./pages/ClientDashboard'));
const DigEdRegistration = lazy(() => import('./pages/DigEdRegistration'));
const ServiceRequestPage = lazy(() => import('./pages/ServiceRequestPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));

export type Route = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'portfolio' 
  | 'blog' 
  | 'contact' 
  | 'auth'
  | 'dashboard'
  | 'diged'
  | 'request'
  | 'careers'
  | 'allen';

interface RouterProps {
  currentRoute: Route;
  onNavigate: (route: Route) => void;
}

// Loading fallback component
const PageLoadingFallback = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="h-12 w-3/4 bg-muted animate-pulse rounded-md" />
        <div className="h-6 w-1/2 bg-muted animate-pulse rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-48 w-full bg-muted animate-pulse rounded-md" />
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded-md" />
              <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function Router({ currentRoute, onNavigate }: RouterProps) {
  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage onNavigate={onNavigate} />;
      case 'about':
        return <AboutPage onNavigate={onNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={onNavigate} />;
      case 'portfolio':
        return <PortfolioPage onNavigate={onNavigate} />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage onNavigate={onNavigate} />;
      case 'auth':
        return <AuthPage onNavigate={onNavigate} />;
      case 'dashboard':
        return <ClientDashboard onNavigate={onNavigate} />;
      case 'diged':
        return <DigEdRegistration onNavigate={onNavigate} />;
      case 'request':
        return <ServiceRequestPage onNavigate={onNavigate} />;
      case 'careers':
        return <CareersPage />;
      case 'allen':
        return <HomePage onNavigate={onNavigate} />; // Redirect allen to home for now
      default:
        return <HomePage onNavigate={onNavigate} />;
    }
  };

  return (
    <Suspense fallback={<PageLoadingFallback />}>
      {renderPage()}
    </Suspense>
  );
}