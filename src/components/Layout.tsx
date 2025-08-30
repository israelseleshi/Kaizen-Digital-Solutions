import React, { memo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTheme } from './ThemeProvider';
import { Route } from './Router';
import { SearchDialog } from './SearchDialog';
import { AiBotWidget } from './AiBotWidget';
import { Moon, Sun, Menu, X, Search } from 'lucide-react';
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
    { label: 'About', route: 'about' as Route },
    { label: 'Services', route: 'services' as Route },
    { label: 'Portfolio', route: 'portfolio' as Route },
    { label: 'Blog', route: 'blog' as Route },
    { label: 'Careers', route: 'careers' as Route },
    { label: 'Contact', route: 'contact' as Route },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-500 ease-in-out"
      style={{ 
        '--motion-duration': 'var(--motion-reduce, 500ms)',
        '--motion-easing': 'var(--motion-reduce, cubic-bezier(0.4, 0, 0.2, 1))',
        transition: 'background-color 500ms cubic-bezier(0.4, 0, 0.2, 1), color 500ms cubic-bezier(0.4, 0, 0.2, 1)'
      } as React.CSSProperties}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border transition-all duration-500 ease-in-out">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-24">
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
            <div className="flex items-center space-x-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-48 border-border focus:border-primary transition-colors"
                />
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-9 h-9 p-0"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
              
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('auth')}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => onNavigate('request')}
                  className="bg-primary hover:bg-primary/90"
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
              className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Sidebar Panel */}
            <div className={`absolute top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-md border-l border-slate-700/50 shadow-2xl transform transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">K</span>
                    </div>
                    <div>
                      <span className="font-bold text-xl text-white">Kaizen Digital</span>
                      <p className="text-xs text-slate-400 mt-0.5">inspiring borderless thinking</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200"
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
                        className={`flex items-center gap-3 w-full text-left px-4 py-4 rounded-lg text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                          currentRoute === item.route 
                            ? 'bg-primary/20 text-primary border-l-4 border-primary shadow-lg' 
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
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
                <div className="p-6 space-y-4 border-t border-slate-700/50">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500 py-3 text-base font-medium transition-all duration-300"
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
      <footer className="bg-card border-t border-border mt-20 transition-all duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                  <span className="text-primary-foreground font-bold">K</span>
                </div>
                <div>
                  <div className="font-bold text-lg">Kaizen Digital Solutions</div>
                  <div className="text-xs text-muted-foreground">inspiring borderless thinking</div>
                </div>
              </div>
              <p className="text-muted-foreground max-w-md">
                Transforming businesses through innovative digital solutions. We help you navigate 
                the digital landscape with cutting-edge technology and strategic thinking.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => onNavigate('services')} className="hover:text-primary">Web Development</button></li>
                <li><button onClick={() => onNavigate('services')} className="hover:text-primary">App Development</button></li>
                <li><button onClick={() => onNavigate('services')} className="hover:text-primary">Digital Marketing</button></li>
                <li><button onClick={() => onNavigate('services')} className="hover:text-primary">Custom Software</button></li>
                <li><button onClick={() => onNavigate('diged')} className="hover:text-primary">DigEd</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => onNavigate('about')} className="hover:text-primary">About Us</button></li>
                <li><button onClick={() => onNavigate('careers')} className="hover:text-primary">Careers</button></li>
                <li><button onClick={() => onNavigate('blog')} className="hover:text-primary">Blog</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-primary">Contact</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Kaizen Digital Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default Layout;