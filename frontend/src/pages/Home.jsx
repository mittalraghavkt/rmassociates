import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Shield, Users, TrendingUp, FileText, BarChart3, Calculator, Building2, CheckCircle, GraduationCap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Reveal } from '../hooks/useScrollReveal';

const Home = () => {
  const highlights = [
    { icon: GraduationCap, title: 'ICAI Qualified', description: 'Chartered Accountant qualified by the Institute of Chartered Accountants of India' },
    { icon: Users, title: 'Client-Centric Approach', description: 'Personalized solutions tailored to your unique business needs' },
    { icon: Shield, title: 'Confidential & Reliable', description: 'Maintaining the highest standards of confidentiality and trust' },
    { icon: Clock, title: 'Timely Compliance', description: 'Ensuring all deadlines are met without any delays' }
  ];

  const services = [
    { icon: Calculator, title: 'Taxation Services', description: 'Comprehensive tax planning and filing services for individuals and businesses' },
    { icon: FileText, title: 'GST Consultancy', description: 'Expert guidance on GST registration, filing, and compliance management' },
    { icon: BarChart3, title: 'Audit Services', description: 'Statutory, internal, and tax audits ensuring accuracy and compliance' },
    { icon: Building2, title: 'Company Incorporation', description: 'End-to-end support for business registration and incorporation' },
    { icon: TrendingUp, title: 'Financial Advisory', description: 'Strategic financial planning and investment advisory services' },
    { icon: CheckCircle, title: 'Virtual CFO', description: 'Part-time CFO services for growing businesses and startups' }
  ];

  const faqs = [
    { q: 'What services do you offer?', a: 'We provide comprehensive financial services including taxation, GST consultancy, statutory and internal audit, company incorporation, ROC compliance, accounting, bookkeeping, financial advisory, and virtual CFO services.' },
    { q: 'How much do your services cost?', a: 'Our fees vary depending on the service and complexity of work. We offer competitive pricing and provide detailed quotes after understanding your requirements. Contact us for a customized quotation.' },
    { q: 'Do you provide services for startups?', a: 'Yes! We specialize in startup advisory services including company incorporation, compliance management, funding assistance, and virtual CFO services tailored for growing businesses.' },
    { q: 'What is the GST registration process?', a: 'GST registration typically takes 7-10 working days. You need to provide basic documents including PAN, Aadhaar, business address proof, and bank details. We handle the complete registration process on your behalf.' },
    { q: 'When should I file my income tax returns?', a: 'For individuals, the ITR filing deadline is typically July 31st of the assessment year. For businesses requiring audit, it\'s September 30th. We recommend filing early to avoid last-minute rush and penalties.' },
    { q: 'Do you offer online consultations?', a: 'Yes, we provide both in-person and online consultations via phone, email, WhatsApp, and video calls for your convenience.' },
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0djZoLTZ2LTZoNnpNMCAydjZoLTZ2LTZoNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fadeInUp">
              <span className="section-badge-dark">ICAI Qualified Chartered Accountants</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Trusted Chartered Accountants for{' '}
                <span className="text-green-300">Tax, Audit &amp; Financial Advisory</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Delivering reliable financial and compliance solutions to businesses, startups, and individuals across India with dedication and a fresh, modern approach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" data-testid="hero-contact-btn">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-green-50 hover:text-green-800 font-semibold px-8 shadow-xl w-full sm:w-auto transition-all duration-300">
                    Contact Us
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/services" data-testid="hero-services-btn">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-green-600 hover:border-green-400 font-semibold px-8 w-full sm:w-auto transition-all duration-300">
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

      {/* About Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&w=600&q=70"
                  alt="Financial documents and calculator"
                  className="rounded-xl shadow-lg w-full max-w-sm mx-auto"
                />
                <div className="absolute -bottom-4 -right-4 bg-green-600 text-white rounded-xl px-4 py-3 shadow-lg">
                  <div className="text-xs uppercase tracking-wider">ICAI</div>
                  <div className="text-sm font-bold">Qualified</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="space-y-6">
                <div>
                  <span className="section-badge">About Us</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-3">
                    Your Dedicated Partner in Financial Excellence
                  </h2>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Raghav Mittal &amp; Associates is a newly established firm of Chartered Accountants committed to providing comprehensive financial, taxation, and compliance solutions. We bring a fresh, modern approach combined with ICAI-qualified expertise to serve our clients.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Founded on the principles of integrity, accuracy, and dedication, we offer personalized attention to every client. Our commitment is to deliver high-quality service backed by the latest knowledge of taxation and regulatory frameworks.
                </p>
                <Link to="/about" data-testid="about-learn-more-btn">
                  <Button className="bg-blue-900 hover:bg-green-700 text-white font-semibold transition-colors duration-300">
                    Learn More About Us
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-blue-50/40">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-12">
              <span className="section-badge">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-3">What Sets Us Apart</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={index} delay={index * 100}>
                  <Card className="card-hover shadow-sm bg-white h-full" data-testid={`highlight-card-${index}`}>
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-900 rounded-xl border border-blue-200 group-hover:bg-green-50 group-hover:border-green-300 transition-all duration-300">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-900">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-12">
              <span className="section-badge">Our Services</span>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-3">Comprehensive Financial Solutions</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                We offer a complete range of professional services to meet all your financial, taxation, and compliance needs.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={index} delay={index * 80}>
                  <Card className="card-hover shadow-sm bg-white group h-full" data-testid={`service-card-${index}`}>
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 group-hover:bg-green-50 group-hover:text-green-700 group-hover:border-green-300 transition-all duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-900">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
          <Reveal>
            <div className="text-center mt-12">
              <Link to="/services">
                <Button size="lg" className="bg-blue-900 hover:bg-green-700 text-white font-semibold px-8 transition-colors duration-300" data-testid="view-all-services-btn">
                  View All Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-blue-50/40">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-12">
              <span className="section-badge">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-3">Frequently Asked Questions</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Find answers to common questions about our CA services
              </p>
            </div>
          </Reveal>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <Reveal key={idx} delay={idx * 80}>
                  <div className="green-hover bg-white rounded-lg shadow-sm p-6 cursor-pointer">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">{faq.q}</h3>
                    <p className="text-gray-700">{faq.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your financial goals and ensure complete compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-green-50 hover:text-green-800 font-semibold px-8 shadow-xl transition-all duration-300" data-testid="cta-contact-btn">
                  Contact Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="https://wa.me/919521452288" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-2 border-green-400 text-green-200 hover:bg-green-600 hover:text-white hover:border-green-400 font-semibold px-8 transition-all duration-300" data-testid="cta-whatsapp-btn">
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
