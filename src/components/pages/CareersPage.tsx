import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { MapPin, Clock, Users, ArrowRight } from 'lucide-react';

export default function CareersPage() {
  const openings = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Join our engineering team to build cutting-edge web applications.'
    },
    {
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Hybrid',
      type: 'Full-time',
      description: 'Help our clients grow their online presence with data-driven strategies.'
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Create beautiful and intuitive user experiences for our clients.'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Join Our <span className="text-primary">Team</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Be part of a team that's shaping the future of digital solutions. We're always looking for talented individuals who share our passion for innovation.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-muted-foreground">Explore opportunities to grow with us</p>
          </div>
          
          <div className="space-y-6">
            {openings.map((job, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                      <p className="text-muted-foreground mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {job.department}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.type}
                        </div>
                      </div>
                    </div>
                    <Button className="mt-4 md:mt-0 md:ml-6">
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}