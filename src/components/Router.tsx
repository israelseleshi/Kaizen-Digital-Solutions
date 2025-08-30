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

// Simple loading fallback component
const PageLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg">Loading...</div>
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
        return <CareersPage onNavigate={onNavigate} />;
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