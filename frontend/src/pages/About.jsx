import React from 'react';
import { Award, Target, Eye, Users, TrendingUp, Shield } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-400/30 mb-6">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Building Trust Through Professional Excellence
            </h1>
            <p className="text-xl text-blue-100">
              A legacy of delivering reliable financial solutions with integrity and expertise
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <span className="text-yellow-600 font-semibold text-sm uppercase tracking-wide">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">
                  Committed to Your Financial Success
                </h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Raghav Mittal & Associates was founded with a vision to provide comprehensive and reliable financial services to businesses and individuals. Over the years, we have grown into a trusted name in the field of chartered accountancy, known for our professionalism, accuracy, and client-centric approach.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our firm specializes in taxation, audit, compliance, and financial advisory services. We serve a diverse clientele including corporations, SMEs, startups, and individuals, helping them navigate complex financial regulations while optimizing their financial performance.
              </p>
              <p className="text-gray-700 leading-relaxed">
                With deep industry knowledge and a commitment to staying updated with regulatory changes, we ensure that our clients receive the most accurate and timely advice. Our team of qualified professionals brings expertise across various sectors including manufacturing, trading, real estate, e-commerce, and financial services.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/7654132/pexels-photo-7654132.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Our Team"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-xl bg-gradient-to-br from-blue-900 to-blue-800 text-white">
              <CardContent className="p-8 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-xl">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
                <p className="text-blue-100 text-lg leading-relaxed">
                  To be the most trusted and preferred financial advisory firm, recognized for delivering exceptional value through innovative solutions, professional excellence, and unwavering commitment to client success.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-8 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl">
                  <Target className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-yellow-50 text-lg leading-relaxed">
                  To empower businesses and individuals with comprehensive financial, tax, and compliance solutions that are accurate, timely, and tailored to their unique needs, enabling them to achieve sustainable growth and financial security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-yellow-600 font-semibold text-sm uppercase tracking-wide">Core Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-wide">Leadership</span>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">Meet Our Founder</h2>
            </div>
            <Card className="border-none shadow-xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-1">
                    <img
                      src="https://images.pexels.com/photos/8297150/pexels-photo-8297150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      alt="CA Raghav Mittal"
                      className="rounded-xl shadow-lg w-full"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-900">CA Raghav Mittal</h3>
                      <p className="text-yellow-600 font-semibold">Founder & Managing Partner</p>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      CA Raghav Mittal is a qualified Chartered Accountant with extensive experience in taxation, audit, and financial advisory. With a deep understanding of business dynamics and regulatory frameworks, he has successfully guided numerous businesses towards financial excellence.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      His expertise spans across various industries, and he is known for his strategic approach to complex financial matters. Under his leadership, Raghav Mittal & Associates has grown to become a trusted partner for businesses seeking reliable financial solutions.
                    </p>
                    <div className="pt-4">
                      <h4 className="font-bold text-blue-900 mb-3">Areas of Expertise:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {expertise.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-gray-700 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team & Credentials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-wide">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">Professional Credentials</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-blue-900 shadow-lg">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-blue-900">Qualifications</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>Qualified Chartered Accountants from ICAI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>Specialized training in taxation and audit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>Continuous professional development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>Industry-specific expertise</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500 shadow-lg">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-blue-900">Experience</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>15+ years of combined experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>Served 500+ clients across industries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>Successfully handled complex financial matters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>Expert in regulatory compliance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;