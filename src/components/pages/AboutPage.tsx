import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Route } from '../Router';
import { Users, Target, Globe, Zap, Heart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface AboutPageProps {
  onNavigate: (route: Route) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const values = [
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We stay ahead of technology trends to deliver cutting-edge solutions that give our clients a competitive advantage.'
    },
    {
      icon: Users,
      title: 'Client Partnership',
      description: 'We build long-term relationships with our clients, working as partners to achieve sustainable digital transformation.'
    },
    {
      icon: Target,
      title: 'Results Driven',
      description: 'Every project is measured by its impact on your business goals, ensuring tangible returns on your investment.'
    },
    {
      icon: Heart,
      title: 'Passion for Excellence',
      description: 'Our team is passionate about creating exceptional digital experiences that inspire and engage users.'
    }
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 15+ years in digital transformation',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&fit=crop&crop=faces'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      bio: 'Technology expert specializing in modern web architectures',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop&crop=faces'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Design',
      bio: 'Creative director with a passion for user-centered design',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop&crop=faces'
    },
    {
      name: 'Emma Wilson',
      role: 'Digital Marketing Director',
      bio: 'Marketing strategist with expertise in data-driven campaigns',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&fit=crop&crop=faces'
    }
  ];

  const stats = [
    { number: '2019', label: 'Founded' },
    { number: '150+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '25', label: 'Team Members' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About <span className="text-primary">Kaizen Digital</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We are a forward-thinking digital solutions company dedicated to transforming businesses 
              through innovative technology and strategic thinking. Our mission is to inspire borderless 
              thinking and create digital experiences that drive real business results.
            </p>
            <Button size="lg" onClick={() => onNavigate('contact')}>
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2019, Kaizen Digital Solutions emerged from a simple belief: that 
                  every business deserves access to world-class digital solutions, regardless 
                  of their size or industry.
                </p>
                <p>
                  Our name "Kaizen" reflects our commitment to continuous improvement - both 
                  in our own processes and in the solutions we deliver for our clients. We 
                  believe in the power of small, consistent improvements that lead to 
                  extraordinary results.
                </p>
                <p>
                  Today, we've grown into a team of passionate professionals who have helped 
                  over 150 businesses transform their digital presence and achieve their goals 
                  through innovative technology solutions.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl transform rotate-3"></div>
              <Card className="relative border-border shadow-2xl">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core values guide everything we do and shape how we work with our clients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-border text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the passionate leaders driving our mission forward
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-border text-center group hover:shadow-lg transition-all">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                    <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Card className="border-border">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To empower businesses of all sizes with innovative digital solutions that drive 
                  growth, enhance efficiency, and create meaningful connections with their customers. 
                  We strive to make advanced technology accessible and impactful for every organization 
                  we serve.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become the leading catalyst for digital transformation, known for inspiring 
                  borderless thinking and creating solutions that transcend traditional limitations. 
                  We envision a world where every business can harness the full power of digital 
                  technology to achieve their dreams.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Let's discuss how we can help transform your business with our innovative digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => onNavigate('request')}
              className="bg-background text-foreground hover:bg-background/90"
            >
              Start a Project
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigate('careers')}
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Join Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}