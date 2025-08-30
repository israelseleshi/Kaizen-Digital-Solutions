import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Route } from '../Router';
import { GraduationCap, Users, Clock, Award } from 'lucide-react';

interface DigEdRegistrationProps {
  onNavigate: (route: Route) => void;
}

export default function DigEdRegistration({ onNavigate }: DigEdRegistrationProps) {
  const [selectedCourse, setSelectedCourse] = useState('');

  const courses = [
    {
      id: 'digital-basics',
      title: 'Digital Literacy Fundamentals',
      duration: '4 weeks',
      level: 'Beginner',
      price: '$299',
      description: 'Learn the essential digital skills for the modern workplace'
    },
    {
      id: 'web-development',
      title: 'Web Development Bootcamp',
      duration: '12 weeks',
      level: 'Intermediate',
      price: '$1,299',
      description: 'Comprehensive web development training from basics to advanced'
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing Mastery',
      duration: '8 weeks',
      level: 'Intermediate',
      price: '$799',
      description: 'Master the art of digital marketing and grow your business online'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">DigEd Registration</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enhance your digital skills with our comprehensive education programs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className={`border-2 cursor-pointer transition-all ${
                selectedCourse === course.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedCourse(course.id)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{course.price}</span>
                  <span className="text-sm bg-accent px-2 py-1 rounded">{course.level}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Max 20 students
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedCourse && (
          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle>Registration Form</CardTitle>
              <p className="text-muted-foreground">
                Complete your registration for {courses.find(c => c.id === selectedCourse)?.title}
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" required />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" />
                </div>
                
                <div>
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input id="company" />
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate('services')}
                  >
                    Back to Services
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90">
                    Complete Registration
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="border-border text-center">
            <CardContent className="p-6">
              <Award className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Certified Training</h3>
              <p className="text-sm text-muted-foreground">Receive industry-recognized certificates</p>
            </CardContent>
          </Card>
          
          <Card className="border-border text-center">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Expert Instructors</h3>
              <p className="text-sm text-muted-foreground">Learn from industry professionals</p>
            </CardContent>
          </Card>
          
          <Card className="border-border text-center">
            <CardContent className="p-6">
              <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Flexible Schedule</h3>
              <p className="text-sm text-muted-foreground">Online and in-person options available</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}