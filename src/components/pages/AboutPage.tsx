import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Route } from '../Router';
import { Users, Target, Heart, Zap, Compass, Telescope } from 'lucide-react';
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
      <section className="py-12 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              About <span className="text-primary">Kaizen Digital</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-muted-foreground mb-8 leading-relaxed">
              Transforming businesses through innovative digital solutions and strategic thinking.
            </p>
            <Button 
              size="lg" 
              onClick={() => onNavigate('contact')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
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
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 dark:text-white">Our Story</h2>
              <div className="space-y-4 text-slate-600 dark:text-muted-foreground">
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
      <section className="py-20 bg-gradient-to-br from-slate-50/50 via-white to-primary/5 dark:bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Our Values</h2>
            <p className="text-xl text-slate-600 dark:text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="space-y-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-8 flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{value.title}</h3>
                    <p className="text-slate-600 dark:text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Our Leadership Team</h2>
            <p className="text-xl text-slate-600 dark:text-muted-foreground max-w-3xl mx-auto">
              Meet the passionate leaders driving our mission forward
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className="w-28 h-28 mx-auto relative">
                      <ImageWithFallback
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-4 bg-primary/10 px-3 py-1 rounded-full inline-block">{member.role}</p>
                  <p className="text-slate-600 dark:text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
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
            <Card className="border-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
              <CardContent className="p-8 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Compass className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
                <p className="text-slate-600 dark:text-muted-foreground leading-relaxed">
                  <strong className="text-slate-900 dark:text-foreground">To empower businesses of all sizes</strong> with innovative digital solutions that drive 
                  growth, enhance efficiency, and create meaningful connections with their customers. 
                  We strive to make advanced technology accessible and impactful for every organization 
                  we serve.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/5"></div>
              <CardContent className="p-8 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Telescope className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Our Vision</h3>
                <p className="text-slate-600 dark:text-muted-foreground leading-relaxed">
                  <strong className="text-slate-900 dark:text-foreground">To become the leading catalyst for digital transformation,</strong> known for inspiring 
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
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              onClick={() => onNavigate('request')}
              className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white font-bold px-10 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 border-0 rounded-xl"
            >
              Start a Project
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigate('services')}
              className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-gradient-to-r hover:from-primary-foreground/10 hover:to-accent/10 hover:text-primary-foreground font-semibold px-10 py-4 text-lg backdrop-blur-sm hover:border-primary-foreground/60 transition-all duration-500 hover:scale-105 rounded-xl shadow-lg hover:shadow-xl"
            >
              Join Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}