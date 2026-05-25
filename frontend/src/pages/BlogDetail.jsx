import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Clock, Tag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { api } from '../lib/api';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const { data } = await api.get(`/blog/${slug}`);
        setPost(data);

        const all = await api.get('/blog');
        const others = (all.data || [])
          .filter((p) => p.slug !== data.slug && p.category === data.category)
          .slice(0, 3);
        setRelated(others);
      } catch (e) {
        if (e.response?.status === 404) {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>;
  }

  if (notFound || !post) {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white" data-testid="blog-detail">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/blog">
            <Button variant="ghost" className="text-blue-900 hover:text-green-700">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to All Articles
            </Button>
          </Link>
        </div>
      </div>

      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">
                <Tag className="w-4 h-4" />
                {post.category}
              </span>
              <span className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                {post.read_time}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              {post.title}
            </h1>

            <div className="flex items-center gap-3 mb-8 pb-8 border-b">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center text-white font-semibold">
                {post.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{post.author}</div>
                <div className="text-sm text-gray-600">Chartered Accountant</div>
              </div>
            </div>

            {post.image && (
              <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
                <img src={post.image} alt={post.title} className="w-full h-auto" />
              </div>
            )}

            <Card className="border border-blue-100 shadow-md mb-12 bg-white">
              <CardContent className="p-8 md:p-12">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  style={{ fontSize: '1.125rem', lineHeight: '1.75', color: '#374151', fontFamily: "'Cormorant Garamond', serif" }}
                />
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-blue-900 text-white mb-12">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Need Professional Advice?
                </h3>
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

            {related.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Related Articles
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {related.map((rp) => (
                    <Card key={rp.id} className="border border-blue-100 shadow-sm card-hover bg-white">
                      <div className="h-40 overflow-hidden bg-blue-100">
                        {rp.image && <img src={rp.image} alt={rp.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />}
                      </div>
                      <CardContent className="p-4">
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold text-xs mb-2">
                          {rp.category}
                        </span>
                        <h3 className="text-sm font-bold text-blue-900 mb-2 line-clamp-2">{rp.title}</h3>
                        <Link to={`/blog/${rp.slug}`}>
                          <Button variant="ghost" size="sm" className="text-blue-900 hover:text-green-700 p-0">
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
