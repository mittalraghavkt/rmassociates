import React from 'react';
import { Factory, ShoppingCart, Rocket, Building, ShoppingBag, Hotel, Landmark, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-400/30 mb-6">
              Industries We Serve
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Industry-Specific Financial Solutions
            </h1>
            <p className="text-xl text-blue-100">
              Deep expertise across diverse sectors with tailored solutions for your industry's unique challenges
            </p>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Serving Multiple Industries
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team understands the unique financial and regulatory requirements of different industries, delivering specialized solutions that drive growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6 space-y-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900">{industry.title}</h3>
                    <p className="text-gray-600 text-sm">{industry.description}</p>
                    <div className="pt-2">
                      <h4 className="font-semibold text-blue-900 mb-2 text-xs uppercase tracking-wide">Key Services:</h4>
                      <ul className="space-y-1">
                        {industry.services.map((service, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-yellow-500 mt-0.5">•</span>
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Industry Expertise Matters */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                Why Industry Expertise Matters
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-blue-900 shadow-lg">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-blue-900">Regulatory Knowledge</h3>
                  <p className="text-gray-700">
                    Each industry has unique regulatory requirements. Our industry-specific expertise ensures complete compliance with sector-specific laws and regulations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500 shadow-lg">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-blue-900">Best Practices</h3>
                  <p className="text-gray-700">
                    We bring industry best practices and benchmarks to help you optimize operations, reduce costs, and improve financial performance.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-900 shadow-lg">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-blue-900">Tailored Solutions</h3>
                  <p className="text-gray-700">
                    Generic solutions don't work for specialized industries. We customize our services to address your industry's specific challenges and opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500 shadow-lg">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-blue-900">Strategic Insights</h3>
                  <p className="text-gray-700">
                    Our deep industry knowledge enables us to provide strategic insights that go beyond compliance, helping you make informed business decisions.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work with Industry Experts?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let us help you navigate your industry's financial and regulatory landscape with confidence.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold px-8 shadow-xl">
              Schedule a Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Industries;