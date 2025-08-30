import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Route } from '../Router';
import { ArrowRight, Users, Globe, Zap, CheckCircle, Cog, GraduationCap, Award, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (route: Route) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const services = [
    {
      icon: Globe,
      title: 'Website & App Development',
      description: 'Custom web and mobile applications built with modern technologies'
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Strategic marketing campaigns that drive growth and engagement'
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

  // Simple stats display component
  function StatCounter({ end, label, suffix = '' }: { end: number; label: string; suffix?: string }) {
    return (
      <div className="text-center">
        <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
          {end}{suffix}
        </div>
        <div className="text-muted-foreground">{label}</div>
      </div>
    );
  }

  // Testimonials Carousel Component
  function TestimonialsCarousel({ testimonials }: { testimonials: Array<{
    name: string;
    title: string;
    company: string;
    text: string;
    image: string;
    rating: number;
    project: string;
  }> }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
      if (!isAutoPlaying) return;
      
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length]);

    const goToSlide = (index: number) => {
      setCurrentIndex(index);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
    };

    const goToPrevious = () => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToNext = () => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
      <div className="relative">
        {/* Main Carousel Container */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <Card className="group relative border-0 shadow-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/60 backdrop-blur-xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 overflow-hidden max-w-4xl mx-auto">
                  {/* Premium Card Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Luxury Border Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary p-[1px] rounded-xl">
                    <div className="bg-white dark:bg-slate-900 rounded-xl h-full w-full"></div>
                  </div>
                  
                  <CardContent className="relative p-8 lg:p-12">
                    {/* Star Rating */}
                    <div className="flex items-center justify-center mb-8">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <div key={i} className="w-6 h-6 text-amber-400 mr-1">
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <div className="relative mb-10 text-center">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-8xl text-primary/20 font-serif">"</div>
                      <p className="text-xl lg:text-2xl text-slate-700 dark:text-muted-foreground leading-relaxed italic relative z-10 px-8">
                        {testimonial.text}
                      </p>
                      <div className="absolute -bottom-6 right-1/2 transform translate-x-1/2 text-8xl text-primary/20 font-serif rotate-180">"</div>
                    </div>
                    
                    {/* Project Badge */}
                    <div className="flex justify-center mb-8">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {testimonial.project}
                      </div>
                    </div>
                    
                    {/* Client Info */}
                    <div className="flex items-center justify-center space-x-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="relative w-20 h-20 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-lg"
                        />
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-xl text-foreground">{testimonial.name}</div>
                        <div className="text-base font-medium text-primary">{testimonial.title}</div>
                        <div className="text-base text-muted-foreground">{testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary scale-125 shadow-lg'
                  : 'bg-slate-300 dark:bg-slate-600 hover:bg-primary/50 hover:scale-110'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="flex justify-center mt-4">
          <div className="text-xs text-slate-700 dark:text-muted-foreground flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-primary animate-pulse' : 'bg-slate-400'}`}></div>
            <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
          </div>
        </div>
      </div>
    );
  }

  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'CEO & Founder',
      company: 'TechStart Inc.',
      text: 'Kaizen Digital transformed our digital presence completely. Their strategic approach and exceptional execution exceeded all our expectations. The ROI has been phenomenal.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&fit=crop&crop=faces',
      rating: 5,
      project: 'Complete Digital Transformation'
    },
    {
      name: 'Michael Chen',
      title: 'CTO',
      company: 'Global Ventures',
      text: 'The custom software solution they built has revolutionized our operations. Their technical expertise and attention to detail is unmatched in the industry.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&fit=crop&crop=faces',
      rating: 5,
      project: 'Enterprise Software Development'
    },
    {
      name: 'Emily Rodriguez',
      title: 'Marketing Director',
      company: 'EcoTech Solutions',
      text: 'Outstanding digital marketing results that speak for themselves. Our traffic increased by 300% in 6 months, and conversion rates doubled. Simply incredible.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&fit=crop&crop=faces',
      rating: 5,
      project: 'Digital Marketing & SEO'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden">
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
                <br />
                <span className="text-primary">Borderless</span>
                <br />
                Thinking
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your business with cutting-edge digital solutions. 
                From web development to AI integration, we help you 
                navigate the digital landscape with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => onNavigate('request')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('portfolio')}
                  className="px-8 py-4"
                >
                  View Our Work
                </Button>
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
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCounter key={index} end={stat.number} label={stat.label} suffix={stat.suffix} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
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
                    <h3 className="font-semibold mb-2">Proven Results</h3>
                    <p className="text-muted-foreground">Track record of successful projects and satisfied clients across industries.</p>
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
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-primary/5 dark:from-slate-900 dark:via-background dark:to-primary/5 relative overflow-hidden">
        {/* Premium Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary to-accent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent to-primary rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              Client Success Stories
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what industry leaders say about our transformative solutions.
            </p>
          </div>
          
          {/* Testimonials Carousel */}
          <TestimonialsCarousel testimonials={testimonials} />
          
          {/* Premium CTA */}
          <div className="text-center mt-16">
            <Button 
              size="lg" 
              onClick={() => onNavigate('contact')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              Join Our Success Stories
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
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
              className="border-primary-foreground text-slate-900 dark:text-primary-foreground hover:bg-primary-foreground hover:text-black dark:border-primary-foreground/70 dark:hover:bg-primary-foreground dark:hover:text-primary"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}