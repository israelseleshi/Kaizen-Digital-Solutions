interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  schema?: Record<string, any>;
}

export function updateSEO(data: SEOData) {
  // Update title
  document.title = data.title;

  // Update or create meta tags
  updateMetaTag('description', data.description);
  
  if (data.keywords) {
    updateMetaTag('keywords', data.keywords.join(', '));
  }

  // Open Graph tags
  updateMetaTag('og:title', data.title, 'property');
  updateMetaTag('og:description', data.description, 'property');
  updateMetaTag('og:type', data.ogType || 'website', 'property');
  updateMetaTag('og:url', window.location.href, 'property');
  
  if (data.ogImage) {
    updateMetaTag('og:image', data.ogImage, 'property');
  }

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', data.title, 'name');
  updateMetaTag('twitter:description', data.description, 'name');
  
  if (data.ogImage) {
    updateMetaTag('twitter:image', data.ogImage, 'name');
  }

  // Canonical URL
  if (data.canonical) {
    updateCanonical(data.canonical);
  }

  // Structured data
  if (data.schema) {
    updateStructuredData(data.schema);
  }
}

function updateMetaTag(name: string, content: string, attribute: string = 'name') {
  let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  
  tag.content = content;
}

function updateCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  
  link.href = url;
}

function updateStructuredData(schema: Record<string, any>) {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

export const seoData = {
  home: {
    title: 'Kaizen Digital Solutions - Inspiring Borderless Thinking',
    description: 'Transform your business with cutting-edge digital solutions. Web development, mobile apps, digital marketing, and AI integration services.',
    keywords: ['digital solutions', 'web development', 'mobile apps', 'digital marketing', 'AI integration'],
    ogType: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Kaizen Digital Solutions',
      url: 'https://kaizendigital.com',
      logo: 'https://kaizendigital.com/logo.png',
      description: 'Digital solutions company offering web development, mobile apps, and digital transformation services',
      sameAs: [
        'https://linkedin.com/company/kaizendigital',
        'https://twitter.com/kaizendigital'
      ]
    }
  },
  about: {
    title: 'About Us - Kaizen Digital Solutions',
    description: 'Learn about our mission to inspire borderless thinking through innovative digital solutions and cutting-edge technology.',
    keywords: ['about kaizen digital', 'digital transformation', 'technology company']
  },
  services: {
    title: 'Digital Services - Web Development, Apps & Marketing',
    description: 'Comprehensive digital services including custom web development, mobile applications, digital marketing, SEO, and business transformation consulting.',
    keywords: ['web development', 'mobile app development', 'digital marketing', 'SEO services', 'custom software']
  },
  portfolio: {
    title: 'Portfolio - Our Digital Solutions Projects',
    description: 'Explore our portfolio of successful digital transformation projects, websites, mobile apps, and custom software solutions.',
    keywords: ['portfolio', 'case studies', 'digital projects', 'web development examples']
  },
  contact: {
    title: 'Contact Us - Get Your Digital Project Started',
    description: 'Ready to transform your business? Contact Kaizen Digital Solutions for a free consultation on your digital project needs.',
    keywords: ['contact', 'consultation', 'digital project quote', 'get started']
  },
  blog: {
    title: 'Blog - Digital Transformation Insights',
    description: 'Stay updated with the latest trends in digital transformation, web development, and technology insights from our expert team.',
    keywords: ['blog', 'digital insights', 'technology trends', 'web development tips']
  }
};