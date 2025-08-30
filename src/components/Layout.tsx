import React, { memo } from 'react';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
import { Route } from './Router';
import { SearchDialog } from './SearchDialog';
import { AiBotWidget } from './AiBotWidget';
import { Moon, Sun, Menu, X, Mail, Briefcase, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { analytics } from '../utils/analytics';

interface LayoutProps {
  children: React.ReactNode;
  currentRoute: Route;
  onNavigate: (route: Route) => void;
}

const Layout = memo(function Layout({ children, currentRoute, onNavigate }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    // Track page views
    analytics.trackPageView(currentRoute);
    analytics.trackScrollDepth();
    analytics.startTimeTracking();
    
    // Keyboard shortcut for search
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentRoute]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', route: 'home' as Route },
    { label: 'Services', route: 'services' as Route },
    { label: 'Portfolio', route: 'portfolio' as Route },
    { label: 'About', route: 'about' as Route },
    { label: 'Blog', route: 'blog' as Route },
    { label: 'Contact', route: 'contact' as Route },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground"
      style={{ 
        '--motion-duration': 'var(--motion-reduce, 500ms)',
        '--motion-easing': 'var(--motion-reduce, cubic-bezier(0.4, 0, 0.2, 1))'
      } as React.CSSProperties}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <span className="text-primary-foreground font-bold">K</span>
              </div>
              <div>
                <div className="font-bold text-lg text-foreground">Kaizen Digital</div>
                <div className="text-xs text-muted-foreground -mt-1">inspiring borderless thinking</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center ml-12">
              {navItems.map((item) => (
                <button
                  key={item.route}
                  onClick={() => onNavigate(item.route)}
                  className={`text-sm transition-colors hover:text-primary cursor-pointer px-4 py-2 ${
                    currentRoute === item.route 
                      ? 'text-primary font-medium' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-9 h-9 p-0"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
              
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('auth')}
                  className="text-sm px-4 py-2 h-9 hover:text-primary"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => onNavigate('request')}
                  className="bg-primary hover:bg-primary/90 text-sm px-4 py-2 h-9"
                >
                  Get Started
                </Button>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden w-9 h-9 p-0"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile menu"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Sidebar */}
          <div className={`fixed inset-0 z-[9999] md:hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
            {/* Backdrop with blur */}
            <div 
              className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Sidebar Panel */}
            <div className={`absolute top-0 right-0 h-full w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700/50 shadow-2xl transform transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">K</span>
                    </div>
                    <div>
                      <span className="font-bold text-xl text-slate-900 dark:text-white">Kaizen Digital</span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">inspiring borderless thinking</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-8">
                  <div className="space-y-3">
                    {navItems.map((item, index) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          onNavigate(item.route);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 w-full text-left px-4 py-4 rounded-lg text-base font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                          currentRoute === item.route 
                            ? 'bg-primary/10 dark:bg-primary/20 text-primary border-l-4 border-primary shadow-md' 
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50'
                        }`}
                        style={{
                          animationDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms'
                        }}
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </nav>

                {/* Bottom Section */}
                <div className="p-6 space-y-4 border-t border-slate-200 dark:border-slate-700/50">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white dark:hover:border-slate-500 py-3 text-base font-medium transition-all duration-300"
                    onClick={() => {
                      onNavigate('auth');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white py-3 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                    onClick={() => {
                      onNavigate('request');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main role="main">{children}</main>
      
      {/* Search Dialog */}
      <SearchDialog 
        open={searchOpen} 
        onOpenChange={setSearchOpen} 
        onNavigate={onNavigate} 
      />

      {/* AI Bot Widget */}
      <AiBotWidget onNavigate={onNavigate} />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700/50 mt-20 relative overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary to-accent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent to-primary rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <div>
                  <div className="font-bold text-xl text-slate-900 dark:text-white">Kaizen Digital Solutions</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 italic">inspiring borderless thinking</div>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 max-w-md leading-relaxed mb-6">
                Transforming businesses through innovative digital solutions. We help you navigate 
                the digital landscape with cutting-edge technology and strategic thinking.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-700/50 hover:bg-primary/20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                  <Mail className="w-5 h-5 text-slate-400 hover:text-primary transition-colors" />
                </div>
                <div className="w-10 h-10 bg-slate-700/50 hover:bg-primary/20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                  <Briefcase className="w-5 h-5 text-slate-400 hover:text-primary transition-colors" />
                </div>
                <div className="w-10 h-10 bg-slate-700/50 hover:bg-primary/20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                  <Globe className="w-5 h-5 text-slate-400 hover:text-primary transition-colors" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 relative">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Services</span>
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
              </h3>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => onNavigate('services')} className="text-slate-600 dark:text-slate-300 hover:text-primary cursor-pointer transition-all duration-300 hover:translate-x-1 flex items-center group"><span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>Web Development</button></li>
                <li><button onClick={() => onNavigate('services')} className="text-slate-600 dark:text-slate-300 hover:text-primary cursor-pointer transition-all duration-300 hover:translate-x-1 flex items-center group"><span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>App Development</button></li>
                <li><button onClick={() => onNavigate('services')} className="text-slate-600 dark:text-slate-300 hover:text-primary cursor-pointer transition-all duration-300 hover:translate-x-1 flex items-center group"><span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>Digital Marketing</button></li>
                <li><button onClick={() => onNavigate('services')} className="text-slate-600 dark:text-slate-300 hover:text-primary cursor-pointer transition-all duration-300 hover:translate-x-1 flex items-center group"><span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>Custom Software</button></li>
                <li><button onClick={() => onNavigate('diged')} className="text-slate-600 dark:text-slate-300 hover:text-primary cursor-pointer transition-all duration-300 hover:translate-x-1 flex items-center group"><span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>DigEd</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 relative">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Company</span>
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
              </h3>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => onNavigate('about')} className="text-slate-600 dark:text-slate-300 hover:text-primary cursor-pointer transition-all duration-300 hover:translate-x-1 flex items-center group"><span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>About Us</button></li>
                <li><button onClick={() => onNavigate('blog')} className="text-slate-600 dark:text-slate-300 hover:text-primary cursor-pointer transition-all duration-300 hover:translate-x-1 flex items-center group"><span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>Blog</button></li>
                <li><button onClick={() => onNavigate('contact')} className="text-slate-600 dark:text-slate-300 hover:text-primary cursor-pointer transition-all duration-300 hover:translate-x-1 flex items-center group"><span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>Contact</button></li>
                <li><button onClick={() => onNavigate('careers')} className="text-slate-600 dark:text-slate-300 hover:text-primary cursor-pointer transition-all duration-300 hover:translate-x-1 flex items-center group"><span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>Careers</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700/50 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-slate-400 mb-4 md:mb-0">
                &copy; 2025 Kaizen Digital Solutions. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm text-slate-400">
                <button className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</button>
                <button className="hover:text-primary transition-colors cursor-pointer">Terms of Service</button>
                <button className="hover:text-primary transition-colors cursor-pointer">Cookies</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default Layout;