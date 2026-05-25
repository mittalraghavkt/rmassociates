import React from 'react';
import { Award, Clock, Shield, Users, TrendingUp, CheckCircle, Target, Zap } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const WhyUs = () => {
  const reasons = [
    {
      icon: Award,
      title: 'Accuracy & Compliance',
      description: 'We ensure 100% accuracy in all our deliverables with strict adherence to regulatory compliance standards. Our quality checks minimize errors and penalties.'
    },
    {
      icon: Users,
      title: 'Transparent Communication',
      description: 'Clear, honest communication at every step. We keep you informed about progress, deadlines, and any regulatory changes affecting your business.'
    },
    {
      icon: TrendingUp,
      title: 'Experienced Team',
      description: 'Our team of qualified Chartered Accountants brings years of expertise across diverse industries, ensuring you receive the best professional guidance.'
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'We value your time. All our services are delivered within committed timelines, ensuring you never miss crucial compliance deadlines.'
    },
    {
      icon: Zap,
      title: 'Technology-Driven Solutions',
      description: 'We leverage modern accounting software and cloud-based solutions to deliver efficient, secure, and accessible financial services.'
    },
    {
      icon: Shield,
      title: 'Confidentiality Guaranteed',
      description: 'Your financial data is treated with utmost confidentiality. We maintain strict data security protocols and professional discretion.'
    },
    {
      icon: Target,
      title: 'Client-Centric Approach',
      description: 'Every client is unique. We tailor our services to your specific needs, providing personalized attention and customized solutions.'
    },
    {
      icon: CheckCircle,
      title: 'Comprehensive Services',
      description: 'From taxation to audit, compliance to advisory - we offer end-to-end financial solutions under one roof, simplifying your business operations.'
    }
  ];

  const benefits = [
    {
      title: 'Cost-Effective Solutions',
      description: 'Professional services at competitive pricing without compromising on quality',
      stat: 'Save up to 40%'
    },
    {
      title: 'Quick Turnaround',
      description: 'Fast processing and timely delivery of all services',
      stat: '24-48 Hours'
    },
    {
      title: 'Client Retention',
      description: 'High client satisfaction and long-term relationships',
      stat: '98% Retention'
    },
    {
      title: 'Successful Deliveries',
      description: 'Track record of error-free and compliant deliveries',
      stat: '5000+ Projects'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-400/30 mb-6">
              Why Choose Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Trusted Partner for Financial Excellence
            </h1>
            <p className="text-xl text-blue-100">
              Discover what makes us the preferred choice for businesses and individuals seeking reliable financial solutions
            </p>
          </div>
        </div>
      </section>

      {/* Main Reasons */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine professional expertise with personalized service to deliver exceptional value
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6 space-y-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900">{reason.title}</h3>
                    <p className="text-gray-600 text-sm">{reason.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits & Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Measurable Results
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence is reflected in our performance metrics
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-lg text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="text-4xl font-bold text-yellow-600">{benefit.stat}</div>
                  <h3 className="text-lg font-bold text-blue-900">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                Our Promise to You
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-blue-900 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Quality Assurance</h3>
                  <p className="text-gray-700 text-sm">
                    Every deliverable goes through rigorous quality checks to ensure accuracy and compliance.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Responsive Support</h3>
                  <p className="text-gray-700 text-sm">
                    Quick response to your queries and concerns. We're always available when you need us.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-900 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Proactive Advisory</h3>
                  <p className="text-gray-700 text-sm">
                    We don't just react to problems - we proactively guide you towards better financial decisions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Long-term Partnership</h3>
                  <p className="text-gray-700 text-sm">
                    We're not just service providers - we're your long-term financial partners committed to your growth.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the Difference</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust us with their financial matters.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold px-8 shadow-xl">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;