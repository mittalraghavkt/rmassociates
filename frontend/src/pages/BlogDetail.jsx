import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Tag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { mockBlogPosts } from '../data/mockBlog';

const BlogDetail = () => {
  const { slug } = useParams();
  const post = mockBlogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link to="/blog">
            <Button className="bg-blue-900 hover:bg-blue-800">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = mockBlogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/blog">
            <Button variant="ghost" className="text-blue-900 hover:text-blue-800">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to All Articles
            </Button>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">
                <Tag className="w-4 h-4" />
                {post.category}
              </span>
              <span className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{post.author}</div>
                <div className="text-sm text-gray-600">Chartered Accountant</div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>

            {/* Article Content */}
            <Card className="border-none shadow-lg mb-12">
              <CardContent className="p-8 md:p-12">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  style={{
                    fontSize: '1.125rem',
                    lineHeight: '1.75',
                    color: '#374151'
                  }}
                />
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="border-none shadow-lg bg-blue-900 text-white mb-12">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Need Professional Advice?</h3>
                <p className="text-blue-100 mb-6">
                  Our chartered accountant is here to help you with personalized financial and tax solutions.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8">
                    Contact Us
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="border-none shadow-lg hover:shadow-xl transition-shadow group">
                      <div className="h-40 overflow-hidden">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold text-xs mb-2">
                          {relatedPost.category}
                        </span>
                        <h3 className="text-sm font-bold text-blue-900 mb-2 line-clamp-2">{relatedPost.title}</h3>
                        <Link to={`/blog/${relatedPost.slug}`}>
                          <Button variant="ghost" size="sm" className="text-blue-900 hover:text-blue-800 p-0">
                            Read Article →
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;