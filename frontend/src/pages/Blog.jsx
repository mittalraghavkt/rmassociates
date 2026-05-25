import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { api } from '../lib/api';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [postsRes, catsRes] = await Promise.all([api.get('/blog'), api.get('/blog/categories')]);
        setPosts(postsRes.data);
        setCategories(catsRes.data);
      } catch (e) {
        // fail silently
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const latestPost = posts[0];
  const otherPosts = filteredPosts.slice(1);
  const isDefaultView = searchQuery === '' && selectedCategory === 'All';

  return (
    <div className="min-h-screen" data-testid="blog-page">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-badge-dark mb-6 inline-block">Insights &amp; Updates</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Tax &amp; Financial Advisory Blog
            </h1>
            <p className="text-xl text-blue-100" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Stay updated with the latest tax laws, compliance requirements, and financial strategies
            </p>
          </div>
        </div>
      </section>

      {/* Search/Filter */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-blue-200 focus:border-blue-500"
                data-testid="blog-search"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`category-${category.replace(/\s+/g, '-').toLowerCase()}`}
                  className={
                    selectedCategory === category
                      ? 'bg-blue-900 hover:bg-blue-800 text-white'
                      : 'border-blue-200 text-blue-900 hover:bg-blue-50 hover:border-green-600'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <section className="py-16 text-center text-gray-600">Loading articles...</section>
      ) : (
        <>
          {/* Featured Latest */}
          {isDefaultView && latestPost && (
            <section className="py-12 bg-blue-50/40">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-2xl font-bold text-blue-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Latest Article
                  </h2>
                  <Card className="border-none shadow-xl overflow-hidden hover-lift bg-white" data-testid="latest-post">
                    <div className="grid md:grid-cols-2">
                      <div className="h-64 md:h-auto bg-blue-100">
                        {latestPost.image && (
                          <img
                            src={latestPost.image}
                            alt={latestPost.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <CardContent className="p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-4 mb-4 text-sm">
                            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                              <Tag className="w-3 h-3" />
                              {latestPost.category}
                            </span>
                            <span className="flex items-center gap-1 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              {new Date(latestPost.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-blue-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {latestPost.title}
                          </h3>
                          <p className="text-gray-600 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem' }}>
                            {latestPost.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                            <User className="w-4 h-4" />
                            <span>{latestPost.author}</span>
                            <span className="mx-2">•</span>
                            <span>{latestPost.read_time}</span>
                          </div>
                        </div>
                        <Link to={`/blog/${latestPost.slug}`}>
                          <Button className="bg-blue-900 hover:bg-blue-800 text-white">
                            Read Article
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </div>
            </section>
          )}

          {/* All Posts */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-blue-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {!isDefaultView ? 'Search Results' : 'All Articles'}
                </h2>
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">No articles found. Try a different search or filter.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(isDefaultView ? otherPosts : filteredPosts).map((post) => (
                      <Card
                        key={post.id}
                        className="border border-blue-100 shadow-sm card-hover group overflow-hidden bg-white"
                        data-testid={`blog-card-${post.slug}`}
                      >
                        <div className="h-48 overflow-hidden bg-blue-100">
                          {post.image && (
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          )}
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-3 text-sm">
                            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold text-xs">
                              <Tag className="w-3 h-3" />
                              {post.category}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-600">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-blue-900 mb-2 line-clamp-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{post.read_time}</span>
                            <Link to={`/blog/${post.slug}`}>
                              <Button variant="ghost" size="sm" className="text-blue-900 hover:text-green-700">
                                Read More
                                <ArrowRight className="ml-1 w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Stay Informed
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Get in touch for personalized tax updates and financial insights.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 shadow-xl">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;
