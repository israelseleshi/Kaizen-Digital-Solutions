import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Route } from '../Router';
import { ArrowRight, MapPin, Clock, Users, Award } from 'lucide-react';

interface CareersPageProps {
  onNavigate: (route: Route) => void;
}

export default function CareersPage({ onNavigate }: CareersPageProps) {
  const openPositions = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote / Hybrid',
      type: 'Full-time',
      description: 'Join our engineering team to build cutting-edge web applications and digital solutions.',
      requirements: ['5+ years React/Node.js experience', 'TypeScript proficiency', 'Cloud platform knowledge']
    },
    {
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Drive our digital marketing initiatives and help clients achieve their growth goals.',
      requirements: ['3+ years digital marketing', 'SEO/SEM expertise', 'Analytics and data-driven mindset']
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote / Hybrid',
      type: 'Full-time',
      description: 'Create beautiful, user-centered designs that enhance digital experiences.',
      requirements: ['Portfolio of web/mobile designs', 'Figma/Adobe Creative Suite', 'User research experience']
    }
  ];

  const benefits = [
    'Competitive salary and equity',
    'Comprehensive health insurance',
    'Flexible remote work options',
    'Professional development budget',
    'Unlimited PTO policy',
    'Latest tech equipment'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Join Our <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Be part of a dynamic team that's transforming businesses through innovative digital solutions.
              We're looking for passionate individuals who share our vision of inspiring borderless thinking.
            </p>
            <Button 
              size="lg" 
              onClick={() => onNavigate('contact')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              View Open Positions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Work With Us?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join a company that values innovation, growth, and work-life balance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Collaborative Culture</h3>
                <p className="text-muted-foreground text-sm">Work with talented professionals in a supportive, inclusive environment.</p>
              </CardContent>
            </Card>

            <Card className="border-border text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Growth Opportunities</h3>
                <p className="text-muted-foreground text-sm">Continuous learning and career advancement in cutting-edge technologies.</p>
              </CardContent>
            </Card>

            <Card className="border-border text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Work-Life Balance</h3>
                <p className="text-muted-foreground text-sm">Flexible schedules and remote work options to fit your lifestyle.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore exciting opportunities to grow your career with us
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-xl font-bold">{position.title}</h3>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          {position.department}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{position.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {position.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {position.type}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Requirements:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {position.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 lg:mt-0 lg:ml-8">
                      <Button 
                        onClick={() => onNavigate('contact')}
                        className="w-full lg:w-auto"
                      >
                        Apply Now
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Benefits & Perks</h2>
              <p className="text-xl text-muted-foreground mb-8">
                We believe in taking care of our team members with comprehensive benefits and a supportive work environment.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl transform rotate-3"></div>
              <Card className="relative border-border shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to Join Us?</h3>
                    <p className="text-muted-foreground mb-6">
                      Don't see a position that fits? We're always looking for talented individuals.
                    </p>
                    <Button 
                      size="lg"
                      onClick={() => onNavigate('contact')}
                      className="w-full"
                    >
                      Send Us Your Resume
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
