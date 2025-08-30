import React from 'react';

interface ServiceIllustrationProps {
  className?: string;
}

// Website & App Development - Adaptive Multi-Platform Flow
export const WebDevIllustration: React.FC<ServiceIllustrationProps> = ({ className = "" }) => (
  <div className={`relative w-full h-32 ${className}`}>
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        {/* Premium gradients */}
        <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="1"/>
          <stop offset="50%" stopColor="rgb(16, 185, 129)" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="rgb(5, 150, 105)" stopOpacity="0.6"/>
        </linearGradient>
        <radialGradient id="glowEffect" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.4"/>
          <stop offset="70%" stopColor="rgb(34, 197, 94)" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="deviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(203, 213, 225)" stopOpacity="1"/>
          <stop offset="100%" stopColor="rgb(148, 163, 184)" stopOpacity="0.8"/>
        </linearGradient>
        {/* Drop shadow filter */}
        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgb(0,0,0)" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Background glow */}
      <circle cx="100" cy="60" r="60" fill="url(#glowEffect)" className="animate-pulse"/>
      
      {/* Central wireframe core with premium styling */}
      <g className="animate-pulse" filter="url(#dropShadow)">
        <rect x="82" y="42" width="36" height="36" fill="url(#coreGradient)" stroke="rgb(34, 197, 94)" strokeWidth="2" rx="6" opacity="0.9"/>
        <rect x="85" y="45" width="30" height="30" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="1.5" rx="4" opacity="0.8"/>
        <circle cx="100" cy="60" r="4" fill="rgb(255, 255, 255)" opacity="0.9"/>
        <circle cx="100" cy="60" r="8" fill="none" stroke="rgb(34, 197, 94)" strokeWidth="1" opacity="0.6" className="animate-ping"/>
      </g>
      
      {/* Desktop monitor with premium styling */}
      <g className="opacity-90" filter="url(#dropShadow)">
        <rect x="18" y="33" width="54" height="34" fill="url(#deviceGradient)" stroke="rgb(148, 163, 184)" strokeWidth="2" rx="3"/>
        <rect x="22" y="37" width="46" height="26" fill="rgb(15, 23, 42)" rx="1"/>
        <rect x="25" y="40" width="40" height="2" fill="rgb(34, 197, 94)" opacity="0.7" rx="1"/>
        <rect x="25" y="44" width="25" height="1.5" fill="rgb(148, 163, 184)" opacity="0.6" rx="0.5"/>
        <rect x="25" y="47" width="35" height="1.5" fill="rgb(148, 163, 184)" opacity="0.4" rx="0.5"/>
        <rect x="40" y="67" width="10" height="10" fill="url(#deviceGradient)" rx="1"/>
        <rect x="35" y="77" width="20" height="3" fill="url(#deviceGradient)" rx="1.5"/>
      </g>
      
      {/* Tablet with premium styling */}
      <g className="opacity-90" filter="url(#dropShadow)">
        <rect x="128" y="23" width="29" height="39" fill="url(#deviceGradient)" stroke="rgb(148, 163, 184)" strokeWidth="2" rx="4"/>
        <rect x="131" y="27" width="23" height="31" fill="rgb(15, 23, 42)" rx="2"/>
        <rect x="133" y="29" width="19" height="1.5" fill="rgb(34, 197, 94)" opacity="0.7" rx="0.5"/>
        <rect x="133" y="32" width="12" height="1" fill="rgb(148, 163, 184)" opacity="0.6" rx="0.5"/>
        <rect x="133" y="34" width="16" height="1" fill="rgb(148, 163, 184)" opacity="0.4" rx="0.5"/>
        <circle cx="142.5" cy="57" r="2.5" fill="rgb(148, 163, 184)" opacity="0.8"/>
      </g>
      
      {/* Smartphone with premium styling */}
      <g className="opacity-90" filter="url(#dropShadow)">
        <rect x="168" y="38" width="19" height="29" fill="url(#deviceGradient)" stroke="rgb(148, 163, 184)" strokeWidth="2" rx="3"/>
        <rect x="170" y="41" width="15" height="23" fill="rgb(15, 23, 42)" rx="1.5"/>
        <rect x="171" y="42" width="13" height="1" fill="rgb(34, 197, 94)" opacity="0.7" rx="0.5"/>
        <rect x="171" y="44" width="8" height="0.8" fill="rgb(148, 163, 184)" opacity="0.6" rx="0.4"/>
        <rect x="171" y="46" width="10" height="0.8" fill="rgb(148, 163, 184)" opacity="0.4" rx="0.4"/>
        <circle cx="177.5" cy="62" r="1.5" fill="rgb(148, 163, 184)" opacity="0.8"/>
      </g>
      
      {/* Premium connection lines with gradients */}
      <defs>
        <linearGradient id="connectionGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
      <line x1="82" y1="60" x2="72" y2="50" stroke="url(#connectionGradient1)" strokeWidth="2" opacity="0.8"/>
      <line x1="118" y1="60" x2="128" y2="42" stroke="url(#connectionGradient1)" strokeWidth="2" opacity="0.8"/>
      <line x1="118" y1="60" x2="168" y2="52" stroke="url(#connectionGradient1)" strokeWidth="2" opacity="0.8"/>
      
      {/* Enhanced data flow particles */}
      <circle cx="77" cy="55" r="1.5" fill="rgb(34, 197, 94)" className="animate-ping">
        <animate attributeName="r" values="1.5;3;1.5" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="123" cy="51" r="1.5" fill="rgb(16, 185, 129)" className="animate-ping" style={{animationDelay: '0.7s'}}>
        <animate attributeName="r" values="1.5;3;1.5" dur="2s" repeatCount="indefinite" begin="0.7s"/>
      </circle>
      <circle cx="148" cy="56" r="1.5" fill="rgb(5, 150, 105)" className="animate-ping" style={{animationDelay: '1.4s'}}>
        <animate attributeName="r" values="1.5;3;1.5" dur="2s" repeatCount="indefinite" begin="1.4s"/>
      </circle>
      
      {/* Floating code elements */}
      <g className="opacity-60">
        <text x="30" y="25" fontSize="6" fill="rgb(34, 197, 94)" fontFamily="monospace">&lt;/&gt;</text>
        <text x="160" y="20" fontSize="5" fill="rgb(148, 163, 184)" fontFamily="monospace">API</text>
        <text x="15" y="85" fontSize="4" fill="rgb(148, 163, 184)" fontFamily="monospace">responsive</text>
      </g>
    </svg>
  </div>
);

// Digital Marketing & SEO - Amplification & Discovery
export const MarketingIllustration: React.FC<ServiceIllustrationProps> = ({ className = "" }) => (
  <div className={`relative w-full h-32 ${className}`}>
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        {/* Premium gradients for marketing */}
        <radialGradient id="brandNodeGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="1"/>
          <stop offset="60%" stopColor="rgb(16, 185, 129)" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="rgb(5, 150, 105)" stopOpacity="0.6"/>
        </radialGradient>
        <radialGradient id="amplificationGlow" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3"/>
          <stop offset="50%" stopColor="rgb(34, 197, 94)" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="audienceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(203, 213, 225)" stopOpacity="1"/>
          <stop offset="100%" stopColor="rgb(148, 163, 184)" stopOpacity="0.7"/>
        </linearGradient>
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(226, 232, 240)" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="rgb(148, 163, 184)" stopOpacity="0.6"/>
        </linearGradient>
        {/* Enhanced drop shadow */}
        <filter id="marketingShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="3" stdDeviation="4" floodColor="rgb(0,0,0)" floodOpacity="0.25"/>
        </filter>
        {/* Glow filter */}
        <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background amplification glow */}
      <circle cx="100" cy="60" r="70" fill="url(#amplificationGlow)" className="animate-pulse"/>
      
      {/* Central brand node with premium styling */}
      <g filter="url(#marketingShadow)">
        <circle cx="100" cy="60" r="10" fill="url(#brandNodeGradient)" className="animate-pulse"/>
        <circle cx="100" cy="60" r="6" fill="rgb(255, 255, 255)" opacity="0.3"/>
        <circle cx="100" cy="60" r="3" fill="rgb(255, 255, 255)" opacity="0.8"/>
      </g>
      
      {/* Enhanced expanding rings with gradients */}
      <circle cx="100" cy="60" r="22" fill="none" stroke="rgb(34, 197, 94)" strokeWidth="2" opacity="0.6" className="animate-ping">
        <animate attributeName="r" values="22;45;22" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="100" cy="60" r="35" fill="none" stroke="rgb(16, 185, 129)" strokeWidth="1.5" opacity="0.4" className="animate-ping" style={{animationDelay: '1s'}}>
        <animate attributeName="r" values="35;60;35" dur="3s" repeatCount="indefinite" begin="1s"/>
        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" begin="1s"/>
      </circle>
      <circle cx="100" cy="60" r="50" fill="none" stroke="rgb(5, 150, 105)" strokeWidth="1" opacity="0.3" className="animate-ping" style={{animationDelay: '2s'}}>
        <animate attributeName="r" values="50;75;50" dur="3s" repeatCount="indefinite" begin="2s"/>
        <animate attributeName="opacity" values="0.3;0.05;0.3" dur="3s" repeatCount="indefinite" begin="2s"/>
      </circle>
      
      {/* Premium target audience icons */}
      <g className="opacity-80" filter="url(#marketingShadow)">
        {/* Top left audience */}
        <circle cx="60" cy="30" r="5" fill="url(#audienceGradient)"/>
        <circle cx="60" cy="30" r="3" fill="rgb(15, 23, 42)" opacity="0.8"/>
        <path d="M58 32 L62 32 L60 37 Z" fill="url(#audienceGradient)"/>
        <circle cx="60" cy="30" r="8" fill="none" stroke="rgb(34, 197, 94)" strokeWidth="0.5" opacity="0.4" className="animate-ping" style={{animationDelay: '0.5s'}}/>
        
        {/* Top right audience */}
        <circle cx="140" cy="35" r="5" fill="url(#audienceGradient)"/>
        <circle cx="140" cy="35" r="3" fill="rgb(15, 23, 42)" opacity="0.8"/>
        <path d="M138 37 L142 37 L140 42 Z" fill="url(#audienceGradient)"/>
        <circle cx="140" cy="35" r="8" fill="none" stroke="rgb(34, 197, 94)" strokeWidth="0.5" opacity="0.4" className="animate-ping" style={{animationDelay: '1.2s'}}/>
        
        {/* Bottom left audience */}
        <circle cx="45" cy="85" r="5" fill="url(#audienceGradient)"/>
        <circle cx="45" cy="85" r="3" fill="rgb(15, 23, 42)" opacity="0.8"/>
        <path d="M43 87 L47 87 L45 92 Z" fill="url(#audienceGradient)"/>
        <circle cx="45" cy="85" r="8" fill="none" stroke="rgb(34, 197, 94)" strokeWidth="0.5" opacity="0.4" className="animate-ping" style={{animationDelay: '1.8s'}}/>
        
        {/* Bottom right audience */}
        <circle cx="155" cy="90" r="5" fill="url(#audienceGradient)"/>
        <circle cx="155" cy="90" r="3" fill="rgb(15, 23, 42)" opacity="0.8"/>
        <path d="M153 92 L157 92 L155 97 Z" fill="url(#audienceGradient)"/>
        <circle cx="155" cy="90" r="8" fill="none" stroke="rgb(34, 197, 94)" strokeWidth="0.5" opacity="0.4" className="animate-ping" style={{animationDelay: '2.5s'}}/>
      </g>
      
      {/* Premium magnifying glass with enhanced styling */}
      <g className="opacity-90" filter="url(#marketingShadow)">
        <circle cx="120" cy="40" r="14" fill="url(#glassGradient)" stroke="rgb(148, 163, 184)" strokeWidth="2"/>
        <circle cx="120" cy="40" r="10" fill="none" stroke="rgb(203, 213, 225)" strokeWidth="1" opacity="0.6"/>
        <line x1="131" y1="51" x2="140" y2="60" stroke="rgb(148, 163, 184)" strokeWidth="3" strokeLinecap="round"/>
        <line x1="133" y1="53" x2="138" y2="58" stroke="rgb(203, 213, 225)" strokeWidth="1" opacity="0.8"/>
        
        {/* Focus beam */}
        <line x1="110" y1="40" x2="100" y2="52" stroke="rgb(34, 197, 94)" strokeWidth="2" opacity="0.8" filter="url(#glowFilter)">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite"/>
        </line>
        
        {/* Lens reflection */}
        <ellipse cx="117" cy="37" rx="3" ry="5" fill="rgb(255, 255, 255)" opacity="0.6" transform="rotate(-30 117 37)"/>
      </g>
      
      {/* Enhanced analytics chart */}
      <g className="opacity-70" filter="url(#marketingShadow)">
        <rect x="20" y="100" width="4" height="10" fill="url(#audienceGradient)" rx="1"/>
        <rect x="26" y="95" width="4" height="15" fill="rgb(34, 197, 94)" opacity="0.8" rx="1"/>
        <rect x="32" y="98" width="4" height="12" fill="url(#audienceGradient)" rx="1"/>
        <rect x="38" y="92" width="4" height="18" fill="rgb(16, 185, 129)" opacity="0.7" rx="1"/>
        
        {/* Chart glow effect */}
        <rect x="26" y="95" width="4" height="15" fill="rgb(34, 197, 94)" opacity="0.3" rx="1" filter="url(#glowFilter)"/>
        <rect x="38" y="92" width="4" height="18" fill="rgb(16, 185, 129)" opacity="0.3" rx="1" filter="url(#glowFilter)"/>
      </g>
      
      {/* Social media and SEO icons */}
      <g className="opacity-60">
        <text x="170" y="25" fontSize="8" fill="rgb(34, 197, 94)" fontFamily="sans-serif">SEO</text>
        <circle cx="25" cy="25" r="6" fill="none" stroke="rgb(148, 163, 184)" strokeWidth="1"/>
        <text x="22" y="28" fontSize="6" fill="rgb(148, 163, 184)" fontFamily="sans-serif">@</text>
        
        {/* Trending arrow */}
        <path d="M170 100 L175 95 L180 100 M175 95 L175 105" stroke="rgb(34, 197, 94)" strokeWidth="1.5" fill="none" opacity="0.7"/>
      </g>
      
      {/* Data connection lines */}
      <g opacity="0.4">
        <line x1="90" y1="60" x2="60" y2="35" stroke="rgb(34, 197, 94)" strokeWidth="1" strokeDasharray="2,2">
          <animate attributeName="stroke-dashoffset" values="0;4" dur="1s" repeatCount="indefinite"/>
        </line>
        <line x1="110" y1="60" x2="140" y2="40" stroke="rgb(34, 197, 94)" strokeWidth="1" strokeDasharray="2,2">
          <animate attributeName="stroke-dashoffset" values="0;4" dur="1s" repeatCount="indefinite" begin="0.3s"/>
        </line>
      </g>
    </svg>
  </div>
);

// Custom Software Solutions - Precision Engineering & Integration
export const SoftwareIllustration: React.FC<ServiceIllustrationProps> = ({ className = "" }) => (
  <div className={`relative w-full h-32 ${className}`}>
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        {/* Premium gradients for software */}
        <linearGradient id="coreModuleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="1"/>
          <stop offset="50%" stopColor="rgb(16, 185, 129)" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="rgb(5, 150, 105)" stopOpacity="0.8"/>
        </linearGradient>
        <linearGradient id="moduleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(203, 213, 225)" stopOpacity="1"/>
          <stop offset="50%" stopColor="rgb(148, 163, 184)" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="rgb(100, 116, 139)" stopOpacity="0.8"/>
        </linearGradient>
        <radialGradient id="integrationGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3"/>
          <stop offset="70%" stopColor="rgb(34, 197, 94)" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0"/>
        </radialGradient>
        {/* Enhanced shadow filter */}
        <filter id="softwareShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="rgb(0,0,0)" floodOpacity="0.3"/>
        </filter>
        {/* Glow effect for connections */}
        <filter id="connectionGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background integration glow */}
      <circle cx="100" cy="60" r="65" fill="url(#integrationGlow)" className="animate-pulse"/>
      
      {/* Central glowing cube with premium styling */}
      <g transform="translate(100,60)" filter="url(#softwareShadow)">
        <g className="animate-pulse">
          <path d="M-10,-10 L10,-10 L15,-5 L-5,-5 Z" fill="url(#coreModuleGradient)" opacity="0.9"/>
          <path d="M10,-10 L10,10 L15,15 L15,-5 Z" fill="url(#coreModuleGradient)" opacity="0.7"/>
          <path d="M-10,10 L10,10 L15,15 L-5,15 Z" fill="url(#coreModuleGradient)" opacity="0.5"/>
          <path d="M-10,-10 L-10,10 L-5,15 L-5,-5 Z" fill="url(#coreModuleGradient)" opacity="0.8"/>
          
          {/* Inner core highlight */}
          <path d="M-6,-6 L6,-6 L9,-3 L-3,-3 Z" fill="rgb(255, 255, 255)" opacity="0.3"/>
          <circle cx="0" cy="0" r="3" fill="rgb(255, 255, 255)" opacity="0.6"/>
        </g>
        
        {/* Pulsing connection points */}
        <circle cx="0" cy="-12" r="2" fill="rgb(34, 197, 94)" className="animate-ping"/>
        <circle cx="12" cy="0" r="2" fill="rgb(34, 197, 94)" className="animate-ping" style={{animationDelay: '0.5s'}}/>
        <circle cx="0" cy="12" r="2" fill="rgb(34, 197, 94)" className="animate-ping" style={{animationDelay: '1s'}}/>
        <circle cx="-12" cy="0" r="2" fill="rgb(34, 197, 94)" className="animate-ping" style={{animationDelay: '1.5s'}}/>
      </g>
      
      {/* Enhanced interlocking modules */}
      <g className="opacity-85" filter="url(#softwareShadow)">
        {/* Left module - CRM System */}
        <g transform="translate(60,45)">
          <path d="M-8,-8 L8,-8 L12,-4 L-4,-4 Z" fill="url(#moduleGradient)"/>
          <path d="M8,-8 L8,8 L12,12 L12,-4 Z" fill="url(#moduleGradient)" opacity="0.8"/>
          <path d="M-8,8 L8,8 L12,12 L-4,12 Z" fill="url(#moduleGradient)" opacity="0.6"/>
          <path d="M-8,-8 L-8,8 L-4,12 L-4,-4 Z" fill="url(#moduleGradient)" opacity="0.9"/>
          <rect x="-4" y="-4" width="8" height="8" fill="rgb(15, 23, 42)" opacity="0.7" rx="1"/>
          <text x="0" y="2" fontSize="4" fill="rgb(148, 163, 184)" textAnchor="middle" fontFamily="monospace">CRM</text>
        </g>
        
        {/* Right module - Analytics */}
        <g transform="translate(140,75)">
          <path d="M-8,-8 L8,-8 L12,-4 L-4,-4 Z" fill="url(#moduleGradient)"/>
          <path d="M8,-8 L8,8 L12,12 L12,-4 Z" fill="url(#moduleGradient)" opacity="0.8"/>
          <path d="M-8,8 L8,8 L12,12 L-4,12 Z" fill="url(#moduleGradient)" opacity="0.6"/>
          <path d="M-8,-8 L-8,8 L-4,12 L-4,-4 Z" fill="url(#moduleGradient)" opacity="0.9"/>
          <rect x="-4" y="-4" width="8" height="8" fill="rgb(15, 23, 42)" opacity="0.7" rx="1"/>
          <rect x="-2" y="0" width="1" height="3" fill="rgb(34, 197, 94)" opacity="0.8"/>
          <rect x="0" y="-1" width="1" height="4" fill="rgb(34, 197, 94)" opacity="0.8"/>
          <rect x="2" y="1" width="1" height="2" fill="rgb(34, 197, 94)" opacity="0.8"/>
        </g>
        
        {/* Top module - API Gateway */}
        <g transform="translate(100,25)">
          <circle cx="0" cy="0" r="10" fill="url(#moduleGradient)" opacity="0.8"/>
          <circle cx="2" cy="-2" r="8" fill="url(#moduleGradient)" opacity="0.9"/>
          <circle cx="0" cy="0" r="6" fill="rgb(15, 23, 42)" opacity="0.7"/>
          <text x="0" y="2" fontSize="3" fill="rgb(148, 163, 184)" textAnchor="middle" fontFamily="monospace">API</text>
          <circle cx="0" cy="0" r="12" fill="none" stroke="rgb(34, 197, 94)" strokeWidth="0.5" opacity="0.4" className="animate-ping"/>
        </g>
        
        {/* Bottom module - Database */}
        <g transform="translate(100,95)">
          <polygon points="-8,0 0,-8 8,0 0,8" fill="url(#moduleGradient)" opacity="0.8"/>
          <polygon points="-6,-2 0,-8 6,-2 0,4" fill="url(#moduleGradient)" opacity="0.9"/>
          <polygon points="-4,0 0,-4 4,0 0,4" fill="rgb(15, 23, 42)" opacity="0.7"/>
          <rect x="-2" y="-1" width="4" height="0.5" fill="rgb(148, 163, 184)" opacity="0.8"/>
          <rect x="-2" y="0" width="4" height="0.5" fill="rgb(148, 163, 184)" opacity="0.6"/>
          <rect x="-2" y="1" width="4" height="0.5" fill="rgb(148, 163, 184)" opacity="0.4"/>
        </g>
      </g>
      
      {/* Premium connection lines with data flow */}
      <g filter="url(#connectionGlow)">
        <line x1="88" y1="52" x2="68" y2="45" stroke="rgb(34, 197, 94)" strokeWidth="2" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite"/>
        </line>
        <line x1="112" y1="68" x2="132" y2="75" stroke="rgb(16, 185, 129)" strokeWidth="2" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" begin="0.5s"/>
        </line>
        <line x1="100" y1="48" x2="100" y2="35" stroke="rgb(5, 150, 105)" strokeWidth="2" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" begin="1s"/>
        </line>
        <line x1="100" y1="72" x2="100" y2="85" stroke="rgb(34, 197, 94)" strokeWidth="2" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" begin="1.5s"/>
        </line>
      </g>
      
      {/* Data flow particles */}
      <circle cx="79" cy="48" r="1.5" fill="rgb(34, 197, 94)">
        <animateMotion dur="3s" repeatCount="indefinite" path="M0,0 L9,7 L21,15"/>
      </circle>
      <circle cx="121" cy="72" r="1.5" fill="rgb(16, 185, 129)">
        <animateMotion dur="3s" repeatCount="indefinite" begin="1s" path="M0,0 L11,-7 L21,-15"/>
      </circle>
      
      {/* Integration indicators */}
      <g className="opacity-60">
        <text x="25" y="20" fontSize="6" fill="rgb(34, 197, 94)" fontFamily="monospace">sync</text>
        <text x="160" y="25" fontSize="5" fill="rgb(148, 163, 184)" fontFamily="monospace">cloud</text>
        <text x="20" y="100" fontSize="4" fill="rgb(148, 163, 184)" fontFamily="monospace">secure</text>
      </g>
    </svg>
  </div>
);

// DigEd - Knowledge Transfer & Illumination
export const EducationIllustration: React.FC<ServiceIllustrationProps> = ({ className = "" }) => (
  <div className={`relative w-full h-32 ${className}`}>
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        {/* Premium gradients for education */}
        <radialGradient id="brainGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.4"/>
          <stop offset="70%" stopColor="rgb(34, 197, 94)" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="1"/>
          <stop offset="50%" stopColor="rgb(16, 185, 129)" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="rgb(5, 150, 105)" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(203, 213, 225)" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="rgb(148, 163, 184)" stopOpacity="0.7"/>
        </linearGradient>
        <filter id="educationShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="rgb(0,0,0)" floodOpacity="0.2"/>
        </filter>
        <filter id="neuralGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background knowledge glow */}
      <circle cx="90" cy="55" r="50" fill="url(#brainGlow)" className="animate-pulse"/>
      
      {/* Enhanced human head profile */}
      <g className="opacity-90" filter="url(#educationShadow)">
        <path d="M70 30 Q85 25 100 30 Q110 35 115 50 Q110 65 100 70 Q90 75 85 85 Q80 90 75 85 Q70 80 65 70 Q60 60 65 50 Q70 40 70 30 Z" 
              fill="url(#headGradient)" stroke="rgb(148, 163, 184)" strokeWidth="2" opacity="0.8"/>
        <path d="M72 32 Q85 28 98 32 Q106 36 110 48 Q106 62 98 66 Q88 70 83 78" 
              fill="none" stroke="rgb(203, 213, 225)" strokeWidth="1" opacity="0.6"/>
      </g>
      
      {/* Premium brain network - glowing nodes */}
      <g className="animate-pulse" filter="url(#neuralGlow)">
        <circle cx="85" cy="50" r="4" fill="url(#neuralGradient)"/>
        <circle cx="85" cy="50" r="2" fill="rgb(255, 255, 255)" opacity="0.8"/>
        
        <circle cx="95" cy="45" r="3" fill="url(#neuralGradient)" opacity="0.9"/>
        <circle cx="95" cy="45" r="1.5" fill="rgb(255, 255, 255)" opacity="0.7"/>
        
        <circle cx="90" cy="60" r="3" fill="url(#neuralGradient)" opacity="0.9"/>
        <circle cx="90" cy="60" r="1.5" fill="rgb(255, 255, 255)" opacity="0.7"/>
        
        <circle cx="100" cy="55" r="3" fill="url(#neuralGradient)" opacity="0.9"/>
        <circle cx="100" cy="55" r="1.5" fill="rgb(255, 255, 255)" opacity="0.7"/>
        
        <circle cx="78" cy="55" r="2.5" fill="url(#neuralGradient)" opacity="0.8"/>
        <circle cx="105" cy="48" r="2.5" fill="url(#neuralGradient)" opacity="0.8"/>
      </g>
      
      {/* Enhanced neural connections */}
      <g className="opacity-80" filter="url(#neuralGlow)">
        <line x1="85" y1="50" x2="95" y2="45" stroke="url(#neuralGradient)" strokeWidth="1.5">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite"/>
        </line>
        <line x1="85" y1="50" x2="90" y2="60" stroke="url(#neuralGradient)" strokeWidth="1.5">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" begin="0.3s"/>
        </line>
        <line x1="95" y1="45" x2="100" y2="55" stroke="url(#neuralGradient)" strokeWidth="1.5">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" begin="0.6s"/>
        </line>
        <line x1="90" y1="60" x2="100" y2="55" stroke="url(#neuralGradient)" strokeWidth="1.5">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" begin="0.9s"/>
        </line>
        <line x1="85" y1="50" x2="78" y2="55" stroke="url(#neuralGradient)" strokeWidth="1.5">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" begin="1.2s"/>
        </line>
        <line x1="95" y1="45" x2="105" y2="48" stroke="url(#neuralGradient)" strokeWidth="1.5">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" begin="1.5s"/>
        </line>
      </g>
      
      {/* Premium knowledge transfer pathways */}
      <g className="opacity-80" filter="url(#neuralGlow)">
        <path d="M115 50 Q130 45 145 50" fill="none" stroke="url(#neuralGradient)" strokeWidth="2" className="animate-pulse">
          <animate attributeName="stroke-dasharray" values="0,20;10,10;20,0" dur="3s" repeatCount="indefinite"/>
        </path>
        <path d="M115 55 Q130 60 145 65" fill="none" stroke="url(#neuralGradient)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '1s'}}>
          <animate attributeName="stroke-dasharray" values="0,20;10,10;20,0" dur="3s" repeatCount="indefinite" begin="1s"/>
        </path>
        <path d="M115 60 Q130 75 145 80" fill="none" stroke="url(#neuralGradient)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '2s'}}>
          <animate attributeName="stroke-dasharray" values="0,20;10,10;20,0" dur="3s" repeatCount="indefinite" begin="2s"/>
        </path>
      </g>
      
      {/* Enhanced learning outcome icons */}
      <g className="opacity-80" filter="url(#educationShadow)">
        {/* Team Training */}
        <g transform="translate(150,45)">
          <circle cx="0" cy="0" r="5" fill="url(#headGradient)"/>
          <circle cx="6" cy="2" r="4" fill="url(#headGradient)"/>
          <circle cx="0" cy="0" r="3" fill="rgb(15, 23, 42)" opacity="0.7"/>
          <circle cx="6" cy="2" r="2.5" fill="rgb(15, 23, 42)" opacity="0.7"/>
          <text x="3" y="15" fontSize="5" fill="rgb(148, 163, 184)" textAnchor="middle" fontFamily="sans-serif">Team</text>
          <circle cx="3" cy="1" r="8" fill="none" stroke="rgb(34, 197, 94)" strokeWidth="0.5" opacity="0.3" className="animate-ping"/>
        </g>
        
        {/* Workshops */}
        <g transform="translate(150,70)">
          <rect x="-4" y="-3" width="8" height="6" fill="url(#headGradient)" rx="1"/>
          <rect x="-3" y="-2" width="6" height="4" fill="rgb(15, 23, 42)" opacity="0.7" rx="0.5"/>
          <rect x="-2" y="-1" width="4" height="0.5" fill="rgb(34, 197, 94)" opacity="0.8"/>
          <rect x="-2" y="0" width="4" height="0.5" fill="rgb(34, 197, 94)" opacity="0.6"/>
          <text x="0" y="15" fontSize="5" fill="rgb(148, 163, 184)" textAnchor="middle" fontFamily="sans-serif">Workshop</text>
        </g>
        
        {/* Certification */}
        <g transform="translate(150,85)">
          <polygon points="0,-4 4,0 0,4 -4,0" fill="url(#headGradient)"/>
          <polygon points="0,-2.5 2.5,0 0,2.5 -2.5,0" fill="rgb(15, 23, 42)" opacity="0.7"/>
          <circle cx="0" cy="0" r="1.5" fill="rgb(34, 197, 94)" opacity="0.8"/>
          <text x="0" y="15" fontSize="5" fill="rgb(148, 163, 184)" textAnchor="middle" fontFamily="sans-serif">Cert</text>
        </g>
      </g>
      
      {/* Knowledge particles */}
      <g className="opacity-60">
        <circle cx="120" cy="48" r="1" fill="rgb(34, 197, 94)">
          <animateMotion dur="4s" repeatCount="indefinite" path="M0,0 Q15,5 25,2"/>
        </circle>
        <circle cx="125" cy="62" r="1" fill="rgb(16, 185, 129)">
          <animateMotion dur="4s" repeatCount="indefinite" begin="1s" path="M0,0 Q15,10 25,15"/>
        </circle>
        <circle cx="122" cy="75" r="1" fill="rgb(5, 150, 105)">
          <animateMotion dur="4s" repeatCount="indefinite" begin="2s" path="M0,0 Q15,-5 25,5"/>
        </circle>
      </g>
      
      {/* Learning indicators */}
      <g className="opacity-50">
        <text x="25" y="25" fontSize="6" fill="rgb(34, 197, 94)" fontFamily="monospace">learn</text>
        <text x="25" y="100" fontSize="5" fill="rgb(148, 163, 184)" fontFamily="monospace">digital</text>
        <text x="170" y="25" fontSize="4" fill="rgb(148, 163, 184)" fontFamily="monospace">skills</text>
      </g>
    </svg>
  </div>
);

// Digital Transformation - Strategy & Clarified Pathways
export const TransformationIllustration: React.FC<ServiceIllustrationProps> = ({ className = "" }) => (
  <div className={`relative w-full h-32 ${className}`}>
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        {/* Premium gradients for transformation */}
        <linearGradient id="pathwayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="1"/>
          <stop offset="50%" stopColor="rgb(16, 185, 129)" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="rgb(5, 150, 105)" stopOpacity="0.8"/>
        </linearGradient>
        <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(203, 213, 225)" stopOpacity="1"/>
          <stop offset="100%" stopColor="rgb(148, 163, 184)" stopOpacity="0.8"/>
        </linearGradient>
        <radialGradient id="transformationGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.2"/>
          <stop offset="70%" stopColor="rgb(34, 197, 94)" stopOpacity="0.05"/>
          <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0"/>
        </radialGradient>
        <filter id="transformationShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="2" stdDeviation="3" floodColor="rgb(0,0,0)" floodOpacity="0.2"/>
        </filter>
        <filter id="pathwayGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background transformation glow */}
      <ellipse cx="115" cy="60" rx="80" ry="40" fill="url(#transformationGlow)" className="animate-pulse"/>
      
      {/* Enhanced chaotic tangled lines (left side) */}
      <g className="opacity-50" filter="url(#transformationShadow)">
        <path d="M20 30 Q35 45 25 60 Q40 75 30 90 Q45 85 35 70 Q50 55 40 40 Q55 25 45 35 Q60 50 50 65" 
              fill="none" stroke="rgb(107, 114, 128)" strokeWidth="2"/>
        <path d="M25 25 Q40 40 30 55 Q45 70 35 85 Q50 80 40 65 Q55 50 45 35 Q60 20 50 30 Q65 45 55 60" 
              fill="none" stroke="rgb(75, 85, 99)" strokeWidth="1.8"/>
        <path d="M30 35 Q45 50 35 65 Q50 80 40 95 Q55 90 45 75 Q60 60 50 45 Q65 30 55 40 Q70 55 60 70" 
              fill="none" stroke="rgb(100, 116, 139)" strokeWidth="1.6"/>
        
        {/* Chaos indicators */}
        <circle cx="35" cy="45" r="2" fill="rgb(107, 114, 128)" opacity="0.6">
          <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="50" cy="70" r="1.5" fill="rgb(75, 85, 99)" opacity="0.7">
          <animate attributeName="r" values="1.5;3;1.5" dur="3s" repeatCount="indefinite" begin="1s"/>
        </circle>
      </g>
      
      {/* Premium clear pathway (glowing line) */}
      <g className="animate-pulse" filter="url(#pathwayGlow)">
        <path d="M65 60 Q90 55 115 60 Q140 65 165 60" 
              fill="none" stroke="url(#pathwayGradient)" strokeWidth="4" opacity="0.9"/>
        <path d="M65 60 Q90 55 115 60 Q140 65 165 60" 
              fill="none" stroke="rgb(255, 255, 255)" strokeWidth="1.5" opacity="0.8"/>
        
        {/* Pathway direction indicators */}
        <polygon points="75,58 80,60 75,62" fill="url(#pathwayGradient)" opacity="0.8">
          <animateTransform attributeName="transform" type="translate" values="0,0;20,0;40,0" dur="4s" repeatCount="indefinite"/>
        </polygon>
        <polygon points="105,58 110,60 105,62" fill="url(#pathwayGradient)" opacity="0.8">
          <animateTransform attributeName="transform" type="translate" values="0,0;20,0;40,0" dur="4s" repeatCount="indefinite" begin="1s"/>
        </polygon>
      </g>
      
      {/* Enhanced organized grid (right side) */}
      <g className="opacity-85" filter="url(#transformationShadow)">
        {/* Grid modules with premium styling */}
        <rect x="138" y="28" width="10" height="10" fill="url(#gridGradient)" rx="2"/>
        <rect x="150" y="28" width="10" height="10" fill="url(#gridGradient)" rx="2"/>
        <rect x="162" y="28" width="10" height="10" fill="url(#gridGradient)" rx="2"/>
        
        <rect x="138" y="40" width="10" height="10" fill="url(#gridGradient)" rx="2"/>
        <rect x="150" y="40" width="10" height="10" fill="url(#pathwayGradient)" rx="2" opacity="0.8"/>
        <rect x="162" y="40" width="10" height="10" fill="url(#gridGradient)" rx="2"/>
        
        <rect x="138" y="52" width="10" height="10" fill="url(#gridGradient)" rx="2"/>
        <rect x="150" y="52" width="10" height="10" fill="url(#gridGradient)" rx="2"/>
        <rect x="162" y="52" width="10" height="10" fill="url(#gridGradient)" rx="2"/>
        
        <rect x="138" y="64" width="10" height="10" fill="url(#gridGradient)" rx="2"/>
        <rect x="150" y="64" width="10" height="10" fill="url(#gridGradient)" rx="2"/>
        <rect x="162" y="64" width="10" height="10" fill="url(#gridGradient)" rx="2"/>
        
        <rect x="138" y="76" width="10" height="10" fill="url(#gridGradient)" rx="2"/>
        <rect x="150" y="76" width="10" height="10" fill="url(#gridGradient)" rx="2"/>
        <rect x="162" y="76" width="10" height="10" fill="url(#gridGradient)" rx="2"/>
        
        {/* Inner details for grid modules */}
        <rect x="140" y="30" width="6" height="6" fill="rgb(15, 23, 42)" opacity="0.6" rx="1"/>
        <rect x="152" y="30" width="6" height="6" fill="rgb(15, 23, 42)" opacity="0.6" rx="1"/>
        <rect x="164" y="30" width="6" height="6" fill="rgb(15, 23, 42)" opacity="0.6" rx="1"/>
        
        {/* Central optimized module */}
        <rect x="152" y="42" width="6" height="6" fill="rgb(255, 255, 255)" opacity="0.9" rx="1"/>
        <circle cx="155" cy="45" r="1.5" fill="rgb(34, 197, 94)" opacity="0.9"/>
      </g>
      
      {/* Premium connection lines in grid */}
      <g className="opacity-60" filter="url(#pathwayGlow)">
        <line x1="148" y1="33" x2="150" y2="33" stroke="url(#pathwayGradient)" strokeWidth="1">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite"/>
        </line>
        <line x1="160" y1="33" x2="162" y2="33" stroke="url(#pathwayGradient)" strokeWidth="1">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" begin="0.5s"/>
        </line>
        <line x1="143" y1="38" x2="143" y2="40" stroke="url(#pathwayGradient)" strokeWidth="1">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" begin="1s"/>
        </line>
        <line x1="155" y1="38" x2="155" y2="40" stroke="url(#pathwayGradient)" strokeWidth="1">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" begin="1.5s"/>
        </line>
        <line x1="167" y1="38" x2="167" y2="40" stroke="url(#pathwayGradient)" strokeWidth="1">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" begin="2s"/>
        </line>
      </g>
      
      {/* Enhanced progress indicators */}
      <circle cx="75" cy="60" r="2.5" fill="url(#pathwayGradient)" className="animate-ping">
        <animate attributeName="r" values="2.5;5;2.5" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="100" cy="57" r="2.5" fill="url(#pathwayGradient)" className="animate-ping" style={{animationDelay: '0.7s'}}>
        <animate attributeName="r" values="2.5;5;2.5" dur="2s" repeatCount="indefinite" begin="0.7s"/>
      </circle>
      <circle cx="125" cy="62" r="2.5" fill="url(#pathwayGradient)" className="animate-ping" style={{animationDelay: '1.4s'}}>
        <animate attributeName="r" values="2.5;5;2.5" dur="2s" repeatCount="indefinite" begin="1.4s"/>
      </circle>
      <circle cx="150" cy="60" r="2.5" fill="url(#pathwayGradient)" className="animate-ping" style={{animationDelay: '2.1s'}}>
        <animate attributeName="r" values="2.5;5;2.5" dur="2s" repeatCount="indefinite" begin="2.1s"/>
      </circle>
      
      {/* Transformation indicators */}
      <g className="opacity-50">
        <text x="25" y="20" fontSize="6" fill="rgb(107, 114, 128)" fontFamily="monospace">chaos</text>
        <text x="90" y="25" fontSize="7" fill="rgb(34, 197, 94)" fontFamily="monospace">→</text>
        <text x="160" y="20" fontSize="6" fill="rgb(34, 197, 94)" fontFamily="monospace">order</text>
        <text x="25" y="105" fontSize="5" fill="rgb(148, 163, 184)" fontFamily="monospace">complex</text>
        <text x="155" y="105" fontSize="5" fill="rgb(148, 163, 184)" fontFamily="monospace">optimized</text>
      </g>
    </svg>
  </div>
);
