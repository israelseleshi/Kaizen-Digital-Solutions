import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FormField } from './FormField';
import { OptimizedButton } from './OptimizedButton';
import { useForm } from '../hooks/useForm';
import { useToast } from '../hooks/useToast';
import { validators } from '../utils/validation';
import { analytics } from '../utils/analytics';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  projectType: string;
  budget: string;
  timeline: string;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  projectType: '',
  budget: '',
  timeline: ''
};

export function ContactForm() {
  const { toast } = useToast();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    handleSubmit,
    reset,
    isValid
  } = useForm<ContactFormData>(initialFormData, {
    name: { required: true, minLength: 2, maxLength: 100 },
    email: { required: true, custom: validators.email },
    company: { maxLength: 100 },
    phone: { custom: (value) => value ? validators.phone(value) : undefined },
    message: { required: true, minLength: 10, maxLength: 1000 },
    projectType: { required: true },
    budget: { required: true },
    timeline: { required: true }
  });

  const projectTypes = [
    { label: 'Website Development', value: 'website' },
    { label: 'Mobile App Development', value: 'mobile' },
    { label: 'Custom Software', value: 'software' },
    { label: 'Digital Marketing', value: 'marketing' },
    { label: 'Digital Transformation', value: 'transformation' },
    { label: 'DigEd Program', value: 'diged' },
    { label: 'Other', value: 'other' }
  ];

  const budgetRanges = [
    { label: 'Under $5,000', value: 'under_5k' },
    { label: '$5,000 - $15,000', value: '5k_15k' },
    { label: '$15,000 - $50,000', value: '15k_50k' },
    { label: '$50,000 - $100,000', value: '50k_100k' },
    { label: 'Over $100,000', value: 'over_100k' },
    { label: 'Let\'s discuss', value: 'discuss' }
  ];

  const timelines = [
    { label: 'ASAP', value: 'asap' },
    { label: '1-3 months', value: '1_3_months' },
    { label: '3-6 months', value: '3_6_months' },
    { label: '6+ months', value: '6_plus_months' },
    { label: 'Just exploring', value: 'exploring' }
  ];

  const onSubmit = handleSubmit(async (formData) => {
    setSubmitStatus('submitting');
    
    try {
      // Track form submission
      analytics.trackConversion({
        type: 'contact_request',
        details: {
          projectType: formData.projectType,
          budget: formData.budget,
          timeline: formData.timeline
        }
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, this would be an actual API call
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
        variant: "success"
      });

      // Reset form after successful submission
      setTimeout(() => {
        reset();
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
      
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  });

  const getSubmitButtonContent = () => {
    switch (submitStatus) {
      case 'submitting':
        return 'Sending...';
      case 'success':
        return (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Message Sent!
          </>
        );
      case 'error':
        return (
          <>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Try Again
          </>
        );
      default:
        return (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        );
    }
  };

  const getSubmitButtonVariant = () => {
    switch (submitStatus) {
      case 'success':
        return 'default';
      case 'error':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Get Started Today</CardTitle>
        <CardDescription>
          Tell us about your project and we'll get back to you within 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              type="text"
              name="name"
              label="Full Name"
              value={values.name}
              error={touched.name ? errors.name : undefined}
              onChange={(value) => setValue('name', value)}
              onBlur={() => setFieldTouched('name')}
              placeholder="John Smith"
              required
              validation={touched.name && !errors.name ? 'success' : touched.name && errors.name ? 'error' : undefined}
            />
            
            <FormField
              type="email"
              name="email"
              label="Email Address"
              value={values.email}
              error={touched.email ? errors.email : undefined}
              onChange={(value) => setValue('email', value)}
              onBlur={() => setFieldTouched('email')}
              placeholder="john@company.com"
              required
              validation={touched.email && !errors.email ? 'success' : touched.email && errors.email ? 'error' : undefined}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              type="text"
              name="company"
              label="Company Name"
              value={values.company}
              error={touched.company ? errors.company : undefined}
              onChange={(value) => setValue('company', value)}
              onBlur={() => setFieldTouched('company')}
              placeholder="Your Company Inc."
            />
            
            <FormField
              type="tel"
              name="phone"
              label="Phone Number"
              value={values.phone}
              error={touched.phone ? errors.phone : undefined}
              onChange={(value) => setValue('phone', value)}
              onBlur={() => setFieldTouched('phone')}
              placeholder="+1 (555) 123-4567"
              validation={touched.phone && values.phone && !errors.phone ? 'success' : touched.phone && errors.phone ? 'error' : undefined}
            />
          </div>

          <FormField
            type="select"
            name="projectType"
            label="Project Type"
            value={values.projectType}
            error={touched.projectType ? errors.projectType : undefined}
            onChange={(value) => setValue('projectType', value)}
            onBlur={() => setFieldTouched('projectType')}
            options={projectTypes}
            placeholder="Select a project type"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              type="select"
              name="budget"
              label="Budget Range"
              value={values.budget}
              error={touched.budget ? errors.budget : undefined}
              onChange={(value) => setValue('budget', value)}
              onBlur={() => setFieldTouched('budget')}
              options={budgetRanges}
              placeholder="Select budget range"
              required
            />
            
            <FormField
              type="select"
              name="timeline"
              label="Timeline"
              value={values.timeline}
              error={touched.timeline ? errors.timeline : undefined}
              onChange={(value) => setValue('timeline', value)}
              onBlur={() => setFieldTouched('timeline')}
              options={timelines}
              placeholder="Select timeline"
              required
            />
          </div>

          <FormField
            type="textarea"
            name="message"
            label="Project Details"
            value={values.message}
            error={touched.message ? errors.message : undefined}
            onChange={(value) => setValue('message', value)}
            onBlur={() => setFieldTouched('message')}
            placeholder="Tell us about your project goals, requirements, and any specific needs..."
            required
            rows={5}
            description="Please provide as much detail as possible to help us understand your needs."
            validation={touched.message && !errors.message ? 'success' : touched.message && errors.message ? 'error' : undefined}
          />

          <OptimizedButton
            type="submit"
            size="lg"
            className="w-full"
            disabled={!isValid || submitStatus === 'submitting' || submitStatus === 'success'}
            loading={submitStatus === 'submitting'}
            trackingLabel="contact_form_submit"
            trackingCategory="conversion"
            // @ts-ignore
            variant={getSubmitButtonVariant()}
          >
            {getSubmitButtonContent()}
          </OptimizedButton>

          {submitStatus === 'success' && (
            <div className="text-center text-green-600 text-sm">
              <CheckCircle className="w-4 h-4 inline mr-2" />
              Thank you! We'll be in touch soon.
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}