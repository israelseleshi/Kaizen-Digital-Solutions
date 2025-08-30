import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Globe, 
  TrendingUp, 
  Cog, 
  GraduationCap, 
  Zap, 
  ArrowRight, 
  Shield,
  Users,
  Code,
  Search,
  CheckCircle
} from 'lucide-react';
import { 
  WebDevIllustration, 
  MarketingIllustration, 
  SoftwareIllustration, 
  EducationIllustration, 
  TransformationIllustration 
} from '../ServiceIllustrations';
import { Route } from '../Router';

interface ServicesPageProps {
  onNavigate: (route: Route) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const services = [
    {
      icon: Globe,
      illustration: WebDevIllustration,
      title: 'Website & App Development',
      price: 'Starting at $5,000',
      description: 'Custom web and mobile applications built with modern technologies for seamless multi-platform experiences',
      features: [
        'Responsive Web Design',
        'Progressive Web Apps',
        'E-commerce Solutions',
        'API Development & Integration',
        'Content Management Systems',
        'Performance Optimization'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'React Native', 'Flutter']
    },
    {
      icon: TrendingUp,
      illustration: MarketingIllustration,
      title: 'Digital Marketing & SEO',
      price: 'Starting at $2,000',
      description: 'Strategic digital marketing solutions to amplify your brand reach and drive targeted audience engagement',
      features: [
        'Search Engine Optimization',
        'Pay-Per-Click Advertising',
        'Social Media Marketing',
        'Email Marketing Campaigns',
        'Content Marketing Strategy',
        'Analytics & Reporting'
      ],
      technologies: ['Google Analytics', 'Google Ads', 'Facebook Ads', 'HubSpot']
    },
    {
      icon: Cog,
      illustration: SoftwareIllustration,
      title: 'Custom Software Solutions',
      price: 'Starting at $10,000',
      description: 'Tailored software solutions with precision engineering designed specifically for your business needs',
      features: [
        'Business Process Automation',
        'Custom CRM Systems',
        'Inventory Management',
        'Data Analytics Dashboards',
        'Third-party Integrations',
        'Cloud Migration Services'
      ],
      technologies: ['Python', 'Java', 'C#', 'AWS', 'Azure', 'PostgreSQL']
    },
    {
      icon: GraduationCap,
      illustration: EducationIllustration,
      title: 'DigEd - Digital Education',
      price: 'Starting at $500',
      description: 'Knowledge transfer programs and workshops to illuminate new digital capabilities within your team',
      features: [
        'Digital Literacy Training',
        'Technology Workshops',
        'Business Transformation Courses',
        'Team Training Programs',
        'Certification Courses',
        'One-on-One Coaching'
      ],
      technologies: ['Interactive Learning', 'Virtual Classrooms', 'Hands-on Labs']
    },
    {
      icon: Zap,
      illustration: TransformationIllustration,
      title: 'Digital Transformation Consulting',
      price: 'Starting at $3,000',
      description: 'Strategic consulting to chart clear pathways through complexity toward optimized business processes',
      features: [
        'Digital Strategy Planning',
        'Technology Assessment',
        'Process Optimization',
        'Change Management',
        'Digital Roadmap Creation',
        'Implementation Support'
      ],
      technologies: ['Strategic Planning', 'Process Mapping', 'Technology Audit']
    }
  ];

  const additionalServices = [
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Protect your digital assets with comprehensive security solutions'
    },
    {
      icon: Users,
      title: 'Team Augmentation',
      description: 'Extend your team with our skilled developers and specialists'
    },
    {
      icon: Code,
      title: 'Legacy System Modernization',
      description: 'Upgrade and modernize your existing systems and applications'
    },
    {
      icon: Search,
      title: 'Data Analytics & BI',
      description: 'Turn your data into actionable business insights'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Our <span className="text-primary">Digital Solutions</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Comprehensive digital services designed to transform your business and drive growth. 
            From web development to AI integration, we've got you covered.
          </p>
          <Button size="lg" onClick={() => onNavigate('request')}>
            Get Started Today
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Core Services</h2>
            <p className="text-xl text-muted-foreground">
              End-to-end digital solutions tailored to your business needs
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <Card key={index} className="border-border shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2 gap-0 min-h-[500px]">
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <service.icon className="w-8 h-8 text-primary" />
                          <div>
                            <h3 className="text-2xl lg:text-3xl font-bold">{service.title}</h3>
                            <p className="text-primary font-semibold">{service.price}</p>
                          </div>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>

                        <div>
                          <h4 className="font-semibold mb-3">What's Included:</h4>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech, idx) => (
                              <span 
                                key={idx}
                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Button 
                          onClick={() => onNavigate('request')}
                          className="w-full sm:w-auto"
                        >
                          Learn More
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className={`bg-gradient-to-br from-primary/5 to-accent/20 p-8 lg:p-12 flex items-center justify-center ${
                      index % 2 === 1 ? 'lg:order-first' : ''
                    }`}>
                      <div className="w-full max-w-lg flex items-center justify-center">
                        <div className="w-full h-48 transition-all duration-500 group">
                          <service.illustration className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Additional Services</h2>
            <p className="text-xl text-muted-foreground">
              Specialized solutions to complement your digital transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="border-border text-center group hover:shadow-lg transition-all">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground">
              A proven methodology that delivers exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Discovery', description: 'We understand your business goals and requirements' },
              { title: 'Planning', description: 'Strategic planning and technical architecture design' },
              { title: 'Development', description: 'Agile development with regular progress updates' },
              { title: 'Launch & Support', description: 'Deployment, training, and ongoing maintenance' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Let's discuss your project and create a custom solution that fits your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => onNavigate('request')}
              className="bg-background text-foreground hover:bg-background/90"
            >
              Request a Quote
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