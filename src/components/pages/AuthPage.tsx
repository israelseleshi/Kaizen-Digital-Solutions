import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Route } from '../Router';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

interface AuthPageProps {
  onNavigate: (route: Route) => void;
}

export default function AuthPage({ onNavigate }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle authentication
    console.log('Form submitted:', formData);
    // For demo purposes, navigate to dashboard
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="max-w-lg w-full">
          <div className="text-center pb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-primary-foreground font-bold text-2xl">K</span>
            </div>
            <h2 className="text-2xl font-bold">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-muted-foreground">
              {isSignUp 
                ? 'Join Kaizen Digital Solutions today' 
                : 'Sign in to your account to continue'
              }
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="pl-14 pr-14 py-4 text-base border-2 border-border focus:border-primary transition-colors rounded-lg"
                        placeholder="First name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="pl-14 pr-4 py-4 text-base border-2 border-border focus:border-primary transition-colors rounded-lg"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-14 pr-4 py-4 text-base border-2 border-border focus:border-primary transition-colors rounded-lg"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-14 pr-12 py-4 text-base border-2 border-border focus:border-primary transition-colors rounded-lg"
                    placeholder="Enter password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-primary" />
                    ) : (
                      <Eye className="w-4 h-4 text-primary" />
                    )}
                  </Button>
                </div>
              </div>

              {isSignUp && (
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-14 pr-4 py-4 text-base border-2 border-border focus:border-primary transition-colors rounded-lg"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>
              )}

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-border text-primary" />
                    <span className="ml-2 text-sm text-muted-foreground">Remember me</span>
                  </label>
                  <Button variant="link" className="text-primary p-0 h-auto">
                    Forgot password?
                  </Button>
                </div>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-4" />
              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary p-0"
                >
                  {isSignUp 
                    ? 'Already have an account? Sign in' 
                    : "Don't have an account? Sign up"
                  }
                </Button>
              </div>
            </div>

          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our{' '}
            <Button variant="link" className="p-0 h-auto text-primary">
              Terms of Service
            </Button>{' '}
            and{' '}
            <Button variant="link" className="p-0 h-auto text-primary">
              Privacy Policy
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}