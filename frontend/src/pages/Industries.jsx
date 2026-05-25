import React from 'react';
import { Factory, ShoppingCart, Rocket, Building, ShoppingBag, Hotel, Landmark, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Reveal } from '../hooks/useScrollReveal';

const Industries = () => {
  const industries = [
    {
      icon: Factory,
      title: 'Manufacturing',
      description: 'Comprehensive financial and compliance solutions for manufacturing units, including inventory management, cost accounting, and GST optimization.',
      services: ['Cost Accounting', 'Inventory Valuation', 'Excise & Customs', 'Working Capital Management']
    },
    {
      icon: ShoppingCart,
      title: 'Trading',
      description: 'Specialized services for trading businesses covering purchase-sale transactions, GST compliance, and inventory management.',
      services: ['GST Optimization', 'Inventory Management', 'Trade Finance', 'Import-Export Compliance']
    },
    {
      icon: Rocket,
      title: 'Startups',
      description: 'Complete startup support from incorporation to funding, compliance, and growth advisory for emerging businesses.',
      services: ['Incorporation', 'Funding Advisory', 'Compliance Management', 'Virtual CFO']
    },
    {
      icon: Building,
      title: 'Real Estate',
      description: 'Expert financial services for real estate developers and investors, including project accounting and regulatory compliance.',
      services: ['Project Accounting', 'RERA Compliance', 'TDS Management', 'Joint Development Advisory']
    },
    {
      icon: ShoppingBag,
      title: 'E-commerce',
      description: 'Tailored solutions for online businesses covering marketplace compliance, GST, and financial management.',
      services: ['Marketplace Compliance', 'Multi-State GST', 'Payment Gateway Reconciliation', 'Financial Analytics']
    },
    {
      icon: Hotel,
      title: 'Hospitality',
      description: 'Specialized accounting and compliance services for hotels, restaurants, and hospitality businesses.',
      services: ['Revenue Management', 'Food License Compliance', 'GST on Services', 'Payroll Management']
    },
    {
      icon: Landmark,
      title: 'Financial Services',
      description: 'Comprehensive services for NBFCs, insurance agents, mutual fund distributors, and financial advisors.',
      services: ['RBI Compliance', 'SEBI Regulations', 'AML Compliance', 'Financial Reporting']
    },
    {
      icon: TrendingUp,
      title: 'Professional Services',
      description: 'Accounting and tax solutions for consultants, freelancers, doctors, lawyers, and other professionals.',
      services: ['Professional Tax', 'Practice Management', 'Presumptive Taxation', 'Retirement Planning']
    }
  ];

  return (
    <div className="min-h-screen" data-testid="industries-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-badge-dark mb-6 inline-block">Industries We Serve</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-4">
              Industry-Specific Financial Solutions
            </h1>
            <p className="text-xl text-blue-100">
              Specialized expertise across diverse sectors with tailored solutions for your industry's unique challenges
            </p>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Serving Multiple Industries
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We understand the unique financial and regulatory requirements of different industries, delivering specialized solutions that drive growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <Reveal key={index} delay={(index % 4) * 80}>
                  <Card className="card-hover shadow-sm bg-white group h-full" data-testid={`industry-card-${index}`}>
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 text-blue-900 rounded-lg border border-blue-200 group-hover:bg-green-50 group-hover:text-green-700 group-hover:border-green-300 transition-all duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-900">{industry.title}</h3>
                      <p className="text-gray-600 text-sm">{industry.description}</p>
                      <div className="pt-2">
                        <h4 className="font-semibold text-blue-900 mb-2 text-xs uppercase tracking-wide">Key Services:</h4>
                        <ul className="space-y-1">
                          {industry.services.map((service, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-green-600 mt-0.5">•</span>
                              <span>{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Industry Expertise Matters */}
      <section className="py-20 bg-blue-50/40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                Why Industry Expertise Matters
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Reveal>
                <Card className="green-hover border-l-4 border-l-blue-900 shadow-sm bg-white">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-blue-900">Regulatory Knowledge</h3>
                    <p className="text-gray-700">
                      Each industry has unique regulatory requirements. Our industry-specific expertise ensures complete compliance with sector-specific laws and regulations.
                    </p>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={120}>
                <Card className="green-hover border-l-4 border-l-green-600 shadow-sm bg-white">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-blue-900">Best Practices</h3>
                    <p className="text-gray-700">
                      We bring industry best practices and benchmarks to help you optimize operations, reduce costs, and improve financial performance.
                    </p>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={150}>
                <Card className="green-hover border-l-4 border-l-blue-900 shadow-sm bg-white">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-blue-900">Tailored Solutions</h3>
                    <p className="text-gray-700">
                      Generic solutions don't work for specialized industries. We customize our services to address your industry's specific challenges and opportunities.
                    </p>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={200}>
                <Card className="green-hover border-l-4 border-l-green-600 shadow-sm bg-white">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-blue-900">Strategic Insights</h3>
                    <p className="text-gray-700">
                      Our industry knowledge enables us to provide strategic insights that go beyond compliance, helping you make informed business decisions.
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

export default Industries;
