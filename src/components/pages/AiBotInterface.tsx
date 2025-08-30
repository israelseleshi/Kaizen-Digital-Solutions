import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Route } from '../Router';
import { Send, Bot, User, Sparkles, ArrowLeft, Mic, Paperclip, MoreVertical } from 'lucide-react';

interface AiBotInterfaceProps {
  onNavigate: (route: Route) => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function AiBotInterface({ onNavigate }: AiBotInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm Allen, your AI assistant from Kaizen Digital Solutions. I'm here to help you with information about our services, answer questions about digital transformation, or assist with your project planning. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('services') || input.includes('what do you offer')) {
      return "We offer a comprehensive range of digital solutions:\n\n• **Website & App Development** - Custom web and mobile applications\n• **Digital Marketing & SEO** - Strategic online presence growth\n• **Custom Software Solutions** - Tailored business software\n• **DigEd** - Digital education and training programs\n• **Digital Transformation Consulting** - Complete business modernization\n\nWould you like to know more about any specific service?";
    }
    
    if (input.includes('pricing') || input.includes('cost') || input.includes('price')) {
      return "Our pricing varies based on project scope and requirements. We offer flexible pricing models:\n\n• **Fixed Price Projects** - For well-defined scopes\n• **Hourly Consulting** - For ongoing support\n• **Retainer Packages** - For long-term partnerships\n\nI'd be happy to connect you with our team for a custom quote. Would you like me to schedule a consultation?";
    }
    
    if (input.includes('diged') || input.includes('education') || input.includes('training')) {
      return "DigEd is our digital education initiative! We offer:\n\n• **Digital Literacy Training** - Basic to advanced digital skills\n• **Technology Workshops** - Hands-on learning sessions\n• **Business Transformation Courses** - Strategic digital planning\n• **Custom Corporate Training** - Tailored to your team's needs\n\nWould you like to register for our DigEd programs or learn more about specific courses?";
    }
    
    if (input.includes('help') || input.includes('how') || input.includes('start')) {
      return "I'm here to help! Here are some ways to get started:\n\n• **Project Consultation** - Let's discuss your specific needs\n• **Service Information** - Learn about our digital solutions\n• **Portfolio Review** - See examples of our work\n• **Schedule a Meeting** - Talk directly with our experts\n\nWhat would you like to explore first?";
    }
    
    if (input.includes('contact') || input.includes('meeting') || input.includes('consultation')) {
      return "I'd be happy to help you connect with our team! You can:\n\n• **Schedule a consultation** - Free 30-minute strategy session\n• **Request a quote** - Get pricing for your project\n• **Contact our team** - Direct communication with experts\n\nWould you like me to help you schedule a meeting or connect you with the right team member?";
    }
    
    return "That's a great question! I'm here to help you understand how Kaizen Digital Solutions can support your digital transformation journey. Whether you're interested in our development services, digital marketing, custom software, or our DigEd programs, I can provide detailed information.\n\nCould you tell me more specifically what you'd like to know about?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What services do you offer?",
    "How much does a website cost?",
    "Tell me about DigEd",
    "Schedule a consultation"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('home')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-semibold">Allen AI Assistant</h1>
                  <p className="text-sm text-muted-foreground">Digital Solutions Expert</p>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-xs text-primary">Online</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-card rounded-lg border border-border shadow-sm">
          {/* Messages */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-accent text-accent-foreground'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                
                <div className={`flex flex-col space-y-1 max-w-[80%] ${
                  message.type === 'user' ? 'items-end' : 'items-start'
                }`}>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground px-2">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-muted-foreground mb-3">Quick questions to get started:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(question)}
                    className="justify-start text-left h-auto py-2 text-sm"
                  >
                    <Sparkles className="w-3 h-3 mr-2 flex-shrink-0" />
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex items-end space-x-2">
              <Button variant="ghost" size="sm" className="flex-shrink-0">
                <Paperclip className="w-4 h-4" />
              </Button>
              
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="resize-none pr-20"
                  disabled={isTyping}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="sm"
                className="bg-primary hover:bg-primary/90 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Allen AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Smart Assistance</h3>
                  <p className="text-xs text-muted-foreground">AI-powered help for all your digital needs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">24/7 Available</h3>
                  <p className="text-xs text-muted-foreground">Get instant answers anytime, anywhere</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Expert Knowledge</h3>
                  <p className="text-xs text-muted-foreground">Trained on our services and best practices</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}