import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Clock, Shield, Users, TrendingUp, FileText, BarChart3, Calculator, Building2, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Home = () => {
  const highlights = [
    {
      icon: Award,
      title: 'Experienced Professionals',
      description: 'Qualified chartered accountants with years of industry experience'
    },
    {
      icon: Users,
      title: 'Client-Centric Approach',
      description: 'Personalized solutions tailored to your unique business needs'
    },
    {
      icon: Shield,
      title: 'Confidential & Reliable',
      description: 'Maintaining highest standards of confidentiality and trust'
    },
    {
      icon: Clock,
      title: 'Timely Compliance',
      description: 'Ensuring all deadlines are met without any delays'
    }
  ];

  const services = [
    {
      icon: Calculator,
      title: 'Taxation Services',
      description: 'Comprehensive tax planning and filing services for individuals and businesses',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileText,
      title: 'GST Consultancy',
      description: 'Expert guidance on GST registration, filing, and compliance management',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: BarChart3,
      title: 'Audit Services',
      description: 'Statutory, internal, and tax audits ensuring accuracy and compliance',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Building2,
      title: 'Company Incorporation',
      description: 'End-to-end support for business registration and incorporation',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: TrendingUp,
      title: 'Financial Advisory',
      description: 'Strategic financial planning and investment advisory services',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: CheckCircle,
      title: 'Virtual CFO',
      description: 'Part-time CFO services for growing businesses and startups',
      color: 'from-amber-500 to-amber-600'
    }
  ];

  const stats = [
    { number: '500+', label: 'Clients Served' },
    { number: '15+', label: 'Years Experience' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0djZoLTZ2LTZoNnpNMCAydjZoLTZ2LTZoNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fadeInUp">
              <div className="inline-block">
                <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-400/30">
                  Trusted Financial Partners
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Trusted Chartered Accountants for{' '}
                <span className="text-yellow-400">Tax, Audit & Financial Advisory</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Delivering reliable financial and compliance solutions to businesses, startups, and individuals across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold px-8 shadow-xl w-full sm:w-auto">
                    Book Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 w-full sm:w-auto">
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block animate-fadeIn">
              <img
                src="https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmaW5hbmNlfGVufDB8fHx8MTc3OTcwNzA0N3ww&ixlib=rb-4.1.0&q=85"
                alt="Professional Finance"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInRight">
              <img
                src="https://images.pexels.com/photos/7654122/pexels-photo-7654122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="About Mittal & Associates"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-yellow-600 font-semibold text-sm uppercase tracking-wide">About Us</span>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">
                  Your Trusted Partner in Financial Excellence
                </h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Raghav Mittal & Associates is a leading firm of Chartered Accountants committed to providing comprehensive financial, taxation, and compliance solutions. With years of experience and a client-first approach, we serve businesses, startups, and individuals with dedication and expertise.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our team of qualified professionals stays updated with the latest regulatory changes to ensure your business remains compliant while optimizing financial performance.
              </p>
              <Link to="/about">
                <Button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-yellow-600 font-semibold text-sm uppercase tracking-wide">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">What Sets Us Apart</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-yellow-600 font-semibold text-sm uppercase tracking-wide">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">Comprehensive Financial Solutions</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We offer a complete range of professional services to meet all your financial, taxation, and compliance needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6 space-y-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${service.color} text-white rounded-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-8">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-yellow-600 font-semibold text-sm uppercase tracking-wide">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Find answers to common questions about our CA services
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">What services do you offer?</h3>
                  <p className="text-gray-700">We provide comprehensive financial services including taxation, GST consultancy, statutory and internal audit, company incorporation, ROC compliance, accounting, bookkeeping, financial advisory, and virtual CFO services.</p>
                </CardContent>
              </Card>
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">How much do your services cost?</h3>
                  <p className="text-gray-700">Our fees vary depending on the service and complexity of work. We offer competitive pricing and provide detailed quotes after understanding your requirements. Contact us for a customized quotation.</p>
                </CardContent>
              </Card>
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Do you provide services for startups?</h3>
                  <p className="text-gray-700">Yes! We specialize in startup advisory services including company incorporation, compliance management, funding assistance, and virtual CFO services tailored for growing businesses.</p>
                </CardContent>
              </Card>
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">What is the GST registration process?</h3>
                  <p className="text-gray-700">GST registration typically takes 7-10 working days. You need to provide basic documents including PAN, Aadhaar, business address proof, and bank details. We handle the complete registration process on your behalf.</p>
                </CardContent>
              </Card>
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">When should I file my income tax returns?</h3>
                  <p className="text-gray-700">For individuals, the ITR filing deadline is typically July 31st of the assessment year. For businesses requiring audit, it's September 30th. We recommend filing early to avoid last-minute rush and penalties.</p>
                </CardContent>
              </Card>
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Do you offer online consultations?</h3>
                  <p className="text-gray-700">Yes, we provide both in-person and online consultations via phone, email, WhatsApp, and video calls for your convenience.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0djZoLTZ2LTZoNnpNMCAydjZoLTZ2LTZoNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your financial goals and ensure complete compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold px-8 shadow-xl">
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="https://wa.me/919521452288" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8">
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;