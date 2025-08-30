import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  price: string;
  description: string;
  features: string[];
  technologies: string[];
  illustration: React.ComponentType<{ className?: string }>;
}

interface StickyScrollServicesProps {
  services: Service[];
  onNavigate: (page: string) => void;
}

export const StickyScrollServices: React.FC<StickyScrollServicesProps> = ({ services, onNavigate }) => {
  const [activeService, setActiveService] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = serviceRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1 && index !== activeService) {
              setIsTransitioning(true);
              setTimeout(() => {
                setActiveService(index);
                setIsTransitioning(false);
              }, 150);
            }
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    serviceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [activeService]);

  const currentService = services[activeService];
  const CurrentIllustration = currentService?.illustration;

  return (
    <div ref={containerRef} className="relative">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Text Content Column - Scrollable */}
        <div className="space-y-32 lg:space-y-48">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => { serviceRefs.current[index] = el; }}
              className="min-h-screen lg:min-h-[80vh] flex flex-col justify-center py-16"
            >
              <div className="space-y-8">
                {/* Service Header */}
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/30 rounded-2xl flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl lg:text-5xl font-bold mb-3 leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {service.title}
                    </h3>
                    <p className="text-primary font-bold text-2xl">{service.price}</p>
                  </div>
                </div>

                {/* Service Description */}
                <p className="text-2xl text-muted-foreground leading-relaxed font-medium">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-8">
                  <div>
                    <h4 className="font-bold text-2xl mb-6 text-foreground">What's Included:</h4>
                    <div className="grid gap-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                          <span className="text-lg font-medium text-muted-foreground leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-bold text-2xl mb-6 text-foreground">Technologies:</h4>
                    <div className="flex flex-wrap gap-4">
                      {service.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-6 py-3 bg-gradient-to-r from-primary/15 to-accent/15 text-primary rounded-full text-base font-semibold border border-primary/20 hover:from-primary/25 hover:to-accent/25 transition-all duration-300 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <Button 
                    onClick={() => onNavigate('request')}
                    className="text-lg px-10 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    Learn More
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sticky Illustration Column */}
        <div className="lg:sticky lg:top-24 lg:h-screen flex items-center justify-center">
          <div className="relative w-full h-[600px] lg:h-[700px] flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/15 to-primary/5 rounded-3xl blur-3xl opacity-60"></div>
            
            {/* Illustration Container */}
            <div className="relative w-full h-full bg-gradient-to-br from-primary/5 to-accent/20 rounded-3xl p-8 lg:p-12 flex items-center justify-center overflow-hidden shadow-2xl">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/15 rounded-full blur-lg animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>

              {/* Main Illustration */}
              <div className={`relative w-full h-full transition-all duration-700 ease-in-out transform ${
                isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
              }`}>
                {CurrentIllustration && (
                  <CurrentIllustration className="w-full h-full drop-shadow-2xl" />
                )}
              </div>

              {/* Service Indicator */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-muted-foreground">
                      {activeService + 1} of {services.length}
                    </span>
                    <div className="flex gap-2">
                      {services.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === activeService 
                              ? 'bg-primary w-8' 
                              : 'bg-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
