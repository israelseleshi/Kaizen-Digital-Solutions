import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { OptimizedButton } from '../OptimizedButton';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Route } from '../Router';
import { ArrowRight, Zap, Globe, Cog, GraduationCap, TrendingUp, Users, Award, CheckCircle } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { analytics } from '../../utils/analytics';
import { useToast } from '../../hooks/useToast';

interface HomePageProps {
  onNavigate: (route: Route) => void;
}

// Animated counter hook
function useCountUp(end: number, start: number = 0, duration: number = 2000) {
  const [count, setCount] = React.useState(start);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    if (!isActive) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * easeOutCubic));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isActive, end, start, duration]);

  const startCounting = () => setIsActive(true);
  
  return { count, startCounting };
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { toast } = useToast();
  const services = [
    {
      icon: Globe,
      title: 'Website & App Development',
      description: 'Custom web and mobile applications built with modern technologies'
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing & SEO',
      description: 'Strategic digital marketing solutions to grow your online presence'
    },
    {
      icon: Cog,
      title: 'Custom Software Solutions',
      description: 'Tailored software solutions designed specifically for your business needs'
    },
    {
      icon: GraduationCap,
      title: 'DigEd',
      description: 'Educational programs about digital solutions and transformation'
    },
    {
      icon: Zap,
      title: 'Digital Transformation',
      description: 'Comprehensive consulting to modernize your business processes'
    }
  ];

  const stats = [
    { number: 150, suffix: '+', label: 'Projects Completed' },
    { number: 50, suffix: '+', label: 'Happy Clients' },
    { number: 5, suffix: '+', label: 'Years Experience' },
    { number: 24, suffix: '/7', label: 'Support Available' }
  ];

  // Intersection observer for animations
  const { elementRef: heroRef } = useIntersectionObserver({ threshold: 0.2 });
  const { elementRef: statsRef, isVisible: statsVisible } = useIntersectionObserver({ threshold: 0.5 });
  const { elementRef: servicesRef } = useIntersectionObserver({ threshold: 0.1 });

  // Counter hooks for stats
  const projectsCount = useCountUp(stats[0].number, 0, 2000);
  const clientsCount = useCountUp(stats[1].number, 0, 2000);
  const yearsCount = useCountUp(stats[2].number, 0, 2000);
  const supportCount = useCountUp(stats[3].number, 0, 2000);

  const counters = [projectsCount, clientsCount, yearsCount, supportCount];

  // Start counters when stats section is visible
  useEffect(() => {
    if (statsVisible) {
      try {
        counters.forEach(counter => counter.startCounting());
      } catch (error) {
        console.warn('Counter animation failed:', error);
      }
    }
  }, [statsVisible]);

  // Track page engagement
  useEffect(() => {
    try {
      analytics.trackEvent({
        action: 'page_view',
        category: 'homepage',
        label: 'hero_section'
      });
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }, []);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      text: 'Kaizen Digital transformed our digital presence completely. Their team is exceptional.',
      image: 'business professional woman'
    },
    {
      name: 'Michael Chen',
      company: 'Global Ventures',
      text: 'The custom software solution they built has revolutionized our operations.',
      image: 'business professional man'
    },
    {
      name: 'Emily Rodriguez',
      company: 'EcoTech Solutions',
      text: 'Outstanding digital marketing results. Our traffic increased by 300% in 6 months.',
      image: 'business professional woman'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Digital Innovation Leaders
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Inspiring
                <span className="text-primary"> Borderless</span>
                <br />
                Thinking
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your business with cutting-edge digital solutions. From web development 
                to AI integration, we help you navigate the digital landscape with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <OptimizedButton 
                  size="lg" 
                  onClick={() => {
                    try {
                      toast({
                        title: "Let's get started!",
                        description: "We're excited to work with you on your digital transformation.",
                      });
                    } catch (error) {
                      console.warn('Toast notification failed:', error);
                    }
                    onNavigate('request');
                  }}
                  trackingLabel="hero_start_project"
                  trackingCategory="conversion"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground animate-fade-in"
                  debounceMs={1000}
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </OptimizedButton>
                <OptimizedButton 
                  variant="outline" 
                  size="lg"
                  onClick={() => onNavigate('portfolio')}
                  trackingLabel="hero_view_work"
                  className="animate-fade-in"
                  style={{ animationDelay: '200ms' }}
                >
                  View Our Work
                </OptimizedButton>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-card p-8 rounded-3xl shadow-2xl border border-border">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-primary/20 rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Globe className="w-6 h-6 text-primary" />
                      </div>
                      <div className="h-16 bg-accent/50 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {counters[index].count}{stat.suffix}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Digital Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer comprehensive digital services to help your business thrive in the modern landscape
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigate('services')}
            >
              View All Services
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Why Choose Kaizen Digital?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Expert Team</h3>
                    <p className="text-muted-foreground">Our experienced professionals bring years of expertise in cutting-edge technologies.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Custom Solutions</h3>
                    <p className="text-muted-foreground">Every project is tailored to your specific business needs and goals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Continuous Support</h3>
                    <p className="text-muted-foreground">We provide ongoing support and maintenance to ensure your success.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Innovation Focus</h3>
                    <p className="text-muted-foreground">We stay ahead of trends to bring you the latest in digital innovation.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="p-6 border-border">
                    <Users className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">Team Collaboration</h3>
                    <p className="text-sm text-muted-foreground">Seamless teamwork across all projects</p>
                  </Card>
                  <Card className="p-6 border-border">
                    <Award className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">Quality Assured</h3>
                    <p className="text-sm text-muted-foreground">Rigorous testing and quality control</p>
                  </Card>
                </div>
                <div className="space-y-4 pt-8">
                  <Card className="p-6 border-border">
                    <Zap className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">Fast Delivery</h3>
                    <p className="text-sm text-muted-foreground">Quick turnaround without compromising quality</p>
                  </Card>
                  <Card className="p-6 border-border">
                    <Globe className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">Global Reach</h3>
                    <p className="text-sm text-muted-foreground">Serving clients worldwide</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground">Don't just take our word for it</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-8">
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-4">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-1${494790108755 + index}?w=64&h=64&fit=crop&crop=face`}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Let's discuss how we can help you achieve your digital goals with our innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => onNavigate('request')}
              className="bg-background text-foreground hover:bg-background/90"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigate('contact')}
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary dark:border-primary-foreground/70 dark:text-primary-foreground/70 dark:hover:bg-primary-foreground dark:hover:text-primary"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}