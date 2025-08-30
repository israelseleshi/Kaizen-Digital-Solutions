import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function BlogPage() {
  const posts = [
    {
      title: 'The Future of Web Development in 2025',
      excerpt: 'Explore the latest trends and technologies shaping the future of web development.',
      category: 'Technology',
      date: '2025-01-15',
      author: 'Alex Chen',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop&crop=center'
    },
    {
      title: 'Digital Transformation: A Complete Guide',
      excerpt: 'Everything you need to know about digital transformation for your business.',
      category: 'Business',
      date: '2025-01-10',
      author: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop&crop=center'
    },
    {
      title: 'SEO Best Practices for 2025',
      excerpt: 'Latest SEO strategies to improve your website ranking and visibility.',
      category: 'Marketing',
      date: '2025-01-05',
      author: 'Emma Wilson',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=200&fit=crop&crop=center'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Blog & <span className="text-primary">Resources</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest insights, trends, and best practices in digital technology.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-all">
                <CardContent className="p-0">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
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