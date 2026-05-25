import React from 'react';
import { Award, Clock, Shield, Users, CheckCircle, Target, Zap, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Reveal } from '../hooks/useScrollReveal';

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
      icon: GraduationCap,
      title: 'ICAI Qualified Professionals',
      description: 'Our team consists of qualified Chartered Accountants from the Institute of Chartered Accountants of India, bringing rigorous training and up-to-date knowledge.'
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

  return (
    <div className="min-h-screen" data-testid="why-us-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-badge-dark mb-6 inline-block">Why Choose Us</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-4">
              Your Dedicated Partner for Financial Excellence
            </h1>
            <p className="text-xl text-blue-100">
              Discover what makes us a reliable choice for businesses and individuals seeking professional financial solutions
            </p>
          </div>
        </div>
      </section>

      {/* Main Reasons */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine professional qualification with personalized service to deliver exceptional value
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <Reveal key={index} delay={(index % 4) * 100}>
                  <Card className="card-hover shadow-sm bg-white group h-full" data-testid={`why-us-card-${index}`}>
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 text-blue-900 rounded-lg border border-blue-200 group-hover:bg-green-50 group-hover:text-green-700 group-hover:border-green-300 transition-all duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-900">{reason.title}</h3>
                      <p className="text-gray-600 text-sm">{reason.description}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 bg-blue-50/40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                Our Promise to You
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Reveal>
                <Card className="green-hover border-l-4 border-l-blue-900 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Quality Assurance</h3>
                    <p className="text-gray-700 text-sm">
                      Every deliverable goes through rigorous quality checks to ensure accuracy and compliance.
                    </p>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={100}>
                <Card className="green-hover border-l-4 border-l-green-600 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Responsive Support</h3>
                    <p className="text-gray-700 text-sm">
                      Quick response to your queries and concerns. We're always available when you need us.
                    </p>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={150}>
                <Card className="green-hover border-l-4 border-l-blue-900 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Proactive Advisory</h3>
                    <p className="text-gray-700 text-sm">
                      We don't just react to problems - we proactively guide you towards better financial decisions.
                    </p>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={200}>
                <Card className="green-hover border-l-4 border-l-green-600 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Long-term Partnership</h3>
                    <p className="text-gray-700 text-sm">
                      We're not just service providers - we're your long-term financial partners committed to your growth.
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
