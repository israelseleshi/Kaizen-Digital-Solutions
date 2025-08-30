import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Route } from '../Router';
import { ArrowLeft, CheckCircle, Calendar, DollarSign, Zap } from 'lucide-react';

interface ServiceRequestPageProps {
  onNavigate: (route: Route) => void;
}

export default function ServiceRequestPage({ onNavigate }: ServiceRequestPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    
    // Step 2: Project Details
    services: [] as string[],
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    
    // Step 3: Additional Info
    hasExistingWebsite: '',
    currentWebsite: '',
    targetAudience: '',
    goals: '',
    additionalServices: [] as string[]
  });

  const services = [
    { id: 'web', label: 'Website Development', description: 'Custom websites and web applications' },
    { id: 'mobile', label: 'Mobile App Development', description: 'iOS and Android applications' },
    { id: 'marketing', label: 'Digital Marketing & SEO', description: 'Online marketing and search optimization' },
    { id: 'software', label: 'Custom Software Solutions', description: 'Tailored business software' },
    { id: 'diged', label: 'DigEd Training', description: 'Digital education and training programs' },
    { id: 'consulting', label: 'Digital Transformation Consulting', description: 'Strategic digital planning' }
  ];

  const additionalServices = [
    { id: 'hosting', label: 'Website Hosting & Maintenance' },
    { id: 'content', label: 'Content Creation' },
    { id: 'analytics', label: 'Analytics & Reporting' },
    { id: 'security', label: 'Security Audit' },
    { id: 'training', label: 'Team Training' },
    { id: 'support', label: 'Ongoing Support' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData({
      ...formData,
      services: formData.services.includes(serviceId)
        ? formData.services.filter(s => s !== serviceId)
        : [...formData.services, serviceId]
    });
  };

  const handleAdditionalServiceToggle = (serviceId: string) => {
    setFormData({
      ...formData,
      additionalServices: formData.additionalServices.includes(serviceId)
        ? formData.additionalServices.filter(s => s !== serviceId)
        : [...formData.additionalServices, serviceId]
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setCurrentStep(4); // Success step
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Let's start with your details</h2>
        <p className="text-muted-foreground">We'll need some basic information to get started</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="John"
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Doe"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="john@company.com"
          required
        />
      </div>

      <div>
        <Label htmlFor="company">Company Name</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          placeholder="Your Company Ltd."
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Tell us about your project</h2>
        <p className="text-muted-foreground">What services are you interested in?</p>
      </div>

      <div>
        <Label className="text-base font-semibold">Services Needed *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`cursor-pointer transition-all border-2 ${
                formData.services.includes(service.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleServiceToggle(service.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                    formData.services.includes(service.id)
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {formData.services.includes(service.id) && (
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{service.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{service.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="budget">Budget Range</Label>
          <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
              <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
              <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
              <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
              <SelectItem value="100k+">$100,000+</SelectItem>
              <SelectItem value="discuss">Prefer to discuss</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="timeline">Timeline</Label>
          <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asap">ASAP</SelectItem>
              <SelectItem value="1-3months">1-3 months</SelectItem>
              <SelectItem value="3-6months">3-6 months</SelectItem>
              <SelectItem value="6-12months">6-12 months</SelectItem>
              <SelectItem value="12months+">12+ months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Project Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Please describe your project, goals, and any specific requirements..."
          rows={4}
          required
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Additional Information</h2>
        <p className="text-muted-foreground">Help us understand your needs better</p>
      </div>

      <div>
        <Label className="text-base font-semibold">Do you have an existing website?</Label>
        <div className="mt-3 space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="website-yes"
              name="hasWebsite"
              value="yes"
              checked={formData.hasExistingWebsite === 'yes'}
              onChange={(e) => handleInputChange('hasExistingWebsite', e.target.value)}
              className="text-primary"
            />
            <Label htmlFor="website-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="website-no"
              name="hasWebsite"
              value="no"
              checked={formData.hasExistingWebsite === 'no'}
              onChange={(e) => handleInputChange('hasExistingWebsite', e.target.value)}
              className="text-primary"
            />
            <Label htmlFor="website-no">No</Label>
          </div>
        </div>
      </div>

      {formData.hasExistingWebsite === 'yes' && (
        <div>
          <Label htmlFor="currentWebsite">Current Website URL</Label>
          <Input
            id="currentWebsite"
            value={formData.currentWebsite}
            onChange={(e) => handleInputChange('currentWebsite', e.target.value)}
            placeholder="https://yourwebsite.com"
          />
        </div>
      )}

      <div>
        <Label htmlFor="targetAudience">Target Audience</Label>
        <Textarea
          id="targetAudience"
          value={formData.targetAudience}
          onChange={(e) => handleInputChange('targetAudience', e.target.value)}
          placeholder="Describe your target audience, demographics, and user personas..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="goals">Business Goals</Label>
        <Textarea
          id="goals"
          value={formData.goals}
          onChange={(e) => handleInputChange('goals', e.target.value)}
          placeholder="What are your main business goals for this project?"
          rows={3}
        />
      </div>

      <div>
        <Label className="text-base font-semibold">Additional Services</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          {additionalServices.map((service) => (
            <div key={service.id} className="flex items-center space-x-3">
              <Checkbox
                id={service.id}
                checked={formData.additionalServices.includes(service.id)}
                onCheckedChange={() => handleAdditionalServiceToggle(service.id)}
              />
              <Label htmlFor={service.id} className="text-sm">{service.label}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Request Submitted Successfully!</h2>
        <p className="text-muted-foreground">
          Thank you for your interest in Kaizen Digital Solutions. We've received your project request
          and will get back to you within 24 hours.
        </p>
      </div>
      
      <div className="bg-accent/50 rounded-lg p-6 text-left max-w-md mx-auto">
        <h3 className="font-semibold mb-3">What's Next?</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Our team will review your requirements</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>We'll schedule a consultation call</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>You'll receive a detailed proposal</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => onNavigate('home')}>
          Back to Home
        </Button>
        <Button variant="outline" onClick={() => onNavigate('portfolio')}>
          View Our Portfolio
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => currentStep === 1 ? onNavigate('home') : prevStep()}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep === 1 ? 'Back to Home' : 'Previous Step'}
          </Button>

          {currentStep < 4 && (
            <>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">K</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Request a Digital Solution</h1>
                  <p className="text-muted-foreground">Let's bring your vision to life</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center space-x-4 mb-8">
                {[1, 2, 3].map((step) => (
                  <React.Fragment key={step}>
                    <div className={`flex items-center space-x-2 ${
                      currentStep >= step ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        currentStep >= step 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {currentStep > step ? <CheckCircle className="w-4 h-4" /> : step}
                      </div>
                      <span className="text-sm font-medium hidden sm:block">
                        {step === 1 && 'Your Details'}
                        {step === 2 && 'Project Info'}
                        {step === 3 && 'Additional Info'}
                      </span>
                    </div>
                    {step < 3 && (
                      <div className={`flex-1 h-0.5 ${
                        currentStep > step ? 'bg-primary' : 'bg-muted'
                      }`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Form Content */}
        <Card className="border-border shadow-lg">
          <CardContent className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderSuccess()}

            {currentStep < 4 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <div></div>
                <Button 
                  onClick={nextStep}
                  className="bg-primary hover:bg-primary/90"
                >
                  {currentStep === 3 ? 'Submit Request' : 'Continue'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Feature highlights */}
        {currentStep < 4 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Fast Response</h3>
                <p className="text-sm text-muted-foreground">Get a response within 24 hours</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Free Consultation</h3>
                <p className="text-sm text-muted-foreground">30-minute strategy session included</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Transparent Pricing</h3>
                <p className="text-sm text-muted-foreground">No hidden fees or surprises</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}