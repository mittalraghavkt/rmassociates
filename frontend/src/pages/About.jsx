import React from 'react';
import { Award, Target, Eye, Users, TrendingUp, Shield, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Reveal } from '../hooks/useScrollReveal';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We uphold the highest standards of professional ethics and transparency in all our dealings.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every service we deliver, exceeding client expectations.'
    },
    {
      icon: Users,
      title: 'Client Focus',
      description: 'Our clients are at the heart of everything we do. Their success is our success.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We embrace technology and innovative solutions to deliver efficient services.'
    }
  ];

  const expertise = [
    'Corporate Taxation',
    'GST & Indirect Taxes',
    'Financial Auditing',
    'Business Advisory',
    'Company Law Matters',
    'Accounting & Compliance',
    'Startup Consultation',
    'Financial Planning'
  ];

  return (
    <div className="min-h-screen" data-testid="about-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-badge-dark mb-6 inline-block">About Us</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-4">
              Building Trust Through Professional Excellence
            </h1>
            <p className="text-xl text-blue-100">
              A dedicated commitment to delivering reliable financial solutions with integrity
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="space-y-6">
                <div>
                  <span className="section-badge">Our Story</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-3">
                    Committed to Your Financial Success
                  </h2>
                </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Raghav Mittal & Associates is a newly established firm of Chartered Accountants founded with a clear vision: to provide comprehensive and reliable financial services with a fresh, modern approach. We combine ICAI-qualified expertise with a deep commitment to client success.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our firm specializes in taxation, audit, compliance, and financial advisory services. We serve a diverse clientele including corporations, SMEs, startups, and individuals, helping them navigate complex financial regulations while optimizing their financial performance.
              </p>
              <p className="text-gray-700 leading-relaxed">
                As a new firm, we bring fresh perspectives, the latest knowledge of regulations, and the enthusiasm to deliver personalized attention to every client. Our commitment to staying updated with the latest regulatory changes ensures that our clients receive accurate and timely advice across various sectors.
              </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=70"
                  alt="Financial planning and analysis"
                  className="rounded-xl shadow-lg w-full max-w-sm mx-auto"
                />
                <div className="absolute -bottom-4 -left-4 bg-blue-900 text-white rounded-xl px-4 py-3 shadow-lg">
                  <div className="text-xs uppercase tracking-wider text-green-300">Founded</div>
                  <div className="text-sm font-bold">2025</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-blue-50/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <Card className="border-none shadow-xl bg-gradient-to-br from-blue-900 to-blue-800 text-white hover-lift">
                <CardContent className="p-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl border border-white/20">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    To be a trusted and preferred financial advisory firm, recognized for delivering exceptional value through innovative solutions, professional excellence, and unwavering commitment to client success.
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={150}>
              <Card className="border-none shadow-xl bg-white hover-lift">
                <CardContent className="p-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-xl border border-green-200">
                    <Target className="w-8 h-8 text-green-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900">Our Mission</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    To empower businesses and individuals with comprehensive financial, tax, and compliance solutions that are accurate, timely, and tailored to their unique needs, enabling them to achieve sustainable growth and financial security.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-12">
              <span className="section-badge">Core Values</span>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-3">What We Stand For</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal key={index} delay={index * 100}>
                  <Card className="card-hover shadow-sm bg-white h-full" data-testid={`value-card-${index}`}>
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-900 rounded-xl border border-blue-200">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-900">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-20 bg-blue-50/40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <span className="section-badge">Leadership</span>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-3">Meet Our Founder</h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <Card className="border-none shadow-xl hover-lift">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-1">
                      <div className="founder-image-frame aspect-[4/5]">
                        <div className="inner h-full">
                          <img
                            src="/images/founder.jpeg"
                            alt="CA Raghav Mittal"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-blue-900" style={{ fontFamily: "'Playfair Display', serif" }}>CA Raghav Mittal</h3>
                        <p className="text-green-700 font-semibold">Founder &amp; Managing Partner</p>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        CA Raghav Mittal is an ICAI-qualified Chartered Accountant with a passion for delivering quality financial services. He founded Raghav Mittal &amp; Associates with a vision to provide modern, reliable, and personalized financial solutions to clients across India.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        With a strong foundation in taxation, audit, and financial advisory from his rigorous CA training, he brings a fresh approach to financial consulting. He is committed to staying current with the latest regulatory changes and leveraging technology to deliver efficient services.
                      </p>
                      <div className="pt-4">
                        <h4 className="font-bold text-blue-900 mb-3">Areas of Expertise:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {expertise.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              <span className="text-gray-700 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Professional Credentials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <span className="section-badge">Our Credentials</span>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-3">Professional Qualifications</h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <Card className="green-hover shadow-md bg-white">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center border border-green-200 flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-900 mb-2">ICAI Qualified</h3>
                      <p className="text-gray-700">
                        Our founder is a qualified Chartered Accountant registered with the Institute of Chartered Accountants of India (ICAI), the premier professional accounting body in India.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-200 flex-shrink-0">
                      <Award className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-900 mb-2">Specialized Training</h3>
                      <p className="text-gray-700">
                        Comprehensive training across taxation, audit, financial reporting, and regulatory compliance, ensuring depth of knowledge across all service areas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center border border-green-200 flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-900 mb-2">Continuous Learning</h3>
                      <p className="text-gray-700">
                        Committed to continuous professional development and staying updated with the latest amendments in tax laws, accounting standards, and regulatory frameworks.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
