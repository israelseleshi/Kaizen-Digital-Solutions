import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Route } from '../Router';
import { ExternalLink, ArrowRight, Filter } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface PortfolioPageProps {
  onNavigate: (route: Route) => void;
}

export default function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'marketing', label: 'Digital Marketing' }
  ];

  const projects = [
    {
      id: 1,
      title: 'TechStart E-commerce Platform',
      category: 'ecommerce',
      description: 'Complete e-commerce solution with inventory management and analytics',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      image: 'ecommerce website dashboard',
      link: '#',
      results: '+300% sales increase',
      client: 'TechStart Inc.'
    },
    {
      id: 2,
      title: 'HealthCare Mobile App',
      category: 'mobile',
      description: 'Patient management and telemedicine mobile application',
      technologies: ['React Native', 'Firebase', 'WebRTC'],
      image: 'mobile healthcare app',
      link: '#',
      results: '50k+ active users',
      client: 'MedCare Solutions'
    },
    {
      id: 3,
      title: 'Financial Services Website',
      category: 'web',
      description: 'Modern website with secure client portal and document management',
      technologies: ['Next.js', 'TypeScript', 'AWS', 'Auth0'],
      image: 'financial services website',
      link: '#',
      results: '+250% lead generation',
      client: 'SecureFinance'
    },
    {
      id: 4,
      title: 'Restaurant Chain Digital Campaign',
      category: 'marketing',
      description: 'Multi-channel digital marketing campaign with social media integration',
      technologies: ['Google Ads', 'Facebook Ads', 'Analytics'],
      image: 'restaurant marketing campaign',
      link: '#',
      results: '+180% online orders',
      client: 'FoodChain Co.'
    },
    {
      id: 5,
      title: 'Educational Platform',
      category: 'web',
      description: 'Online learning platform with video streaming and progress tracking',
      technologies: ['Vue.js', 'Django', 'Video CDN'],
      image: 'educational platform interface',
      link: '#',
      results: '10k+ students enrolled',
      client: 'EduTech Academy'
    },
    {
      id: 6,
      title: 'Logistics Mobile App',
      category: 'mobile',
      description: 'Real-time tracking and delivery management application',
      technologies: ['Flutter', 'Google Maps', 'WebSocket'],
      image: 'logistics tracking app',
      link: '#',
      results: '99.9% delivery accuracy',
      client: 'FastTrack Logistics'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Our <span className="text-primary">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Explore our collection of successful projects and see how we've helped businesses 
            transform their digital presence and achieve remarkable results.
          </p>
          <Button size="lg" onClick={() => onNavigate('request')}>
            Start Your Project
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Filter className="w-5 h-5 text-muted-foreground mr-2" />
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(category.id)}
                className={activeFilter === category.id ? "bg-primary" : ""}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="border-border group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-1${460925895917 + project.id}?w=400&h=250&fit=crop`}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button size="sm" variant="secondary">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {categories.find(c => c.id === project.category)?.label}
                      </Badge>
                      <span className="text-sm text-primary font-semibold">{project.results}</span>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Client: {project.client}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      View Case Study
                      <ArrowRight className="ml-2 w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Project Results</h2>
            <p className="text-xl text-muted-foreground">
              Numbers that speak for themselves
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '150+', label: 'Projects Completed', icon: '🚀' },
              { number: '98%', label: 'Client Satisfaction', icon: '😊' },
              { number: '250%', label: 'Average ROI Increase', icon: '📈' },
              { number: '24/7', label: 'Support Available', icon: '🛠️' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Let's work together to create the next impressive project for your business.
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
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}