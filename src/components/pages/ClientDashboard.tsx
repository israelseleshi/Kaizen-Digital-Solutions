import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Route } from '../Router';
import { Activity, Clock, CheckCircle } from 'lucide-react';

interface ClientDashboardProps {
  onNavigate: (route: Route) => void;
}

export default function ClientDashboard({ onNavigate }: ClientDashboardProps) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's an overview of your projects and account.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Total completed projects</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Requiring your attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'E-commerce Website', status: 'In Progress', progress: 75 },
                  { name: 'Mobile App Development', status: 'Review', progress: 90 },
                  { name: 'SEO Optimization', status: 'Completed', progress: 100 }
                ].map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">{project.status}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{project.progress}%</div>
                      <div className="w-20 h-2 bg-muted rounded-full mt-1">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => onNavigate('request')}
                className="w-full justify-start"
              >
                Request New Project
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('contact')}
                className="w-full justify-start"
              >
                Contact Support
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('allen')}
                className="w-full justify-start"
              >
                Chat with Allen AI
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}