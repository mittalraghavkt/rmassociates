import React from 'react';
import { Calculator, FileText, BarChart3, Building2, TrendingUp, CheckCircle, Shield, Briefcase, Users, BookOpen, DollarSign, Receipt } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Services = () => {
  const services = [
    {
      icon: Calculator,
      title: 'Taxation Services',
      description: 'Comprehensive tax planning, filing, and advisory services for individuals and businesses.',
      features: [
        'Income Tax Planning & Filing',
        'Corporate Tax Advisory',
        'Tax Assessments & Appeals',
        'Transfer Pricing',
        'International Taxation',
        'Tax Litigation Support'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileText,
      title: 'GST Consultancy & Filing',
      description: 'Expert guidance on GST registration, compliance, and return filing.',
      features: [
        'GST Registration',
        'Monthly/Quarterly Return Filing',
        'Input Tax Credit Advisory',
        'GST Audit Support',
        'Refund Processing',
        'GST Litigation'
      ],
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Receipt,
      title: 'Income Tax Return Filing',
      description: 'Hassle-free ITR filing for salaried individuals, professionals, and businesses.',
      features: [
        'Individual ITR Filing',
        'Business ITR Filing',
        'Revised Return Filing',
        'Loss Carry Forward',
        'TDS Return Filing',
        'Form 16 Verification'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Statutory Audit',
      description: 'Comprehensive statutory audits ensuring compliance with regulatory requirements.',
      features: [
        'Company Audit (Companies Act)',
        'Financial Statement Audit',
        'Compliance Verification',
        'Audit Report Preparation',
        'Board Meeting Support',
        'AGM Assistance'
      ],
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: Shield,
      title: 'Internal Audit',
      description: 'Internal audit services to strengthen controls and improve operational efficiency.',
      features: [
        'Process Audit',
        'Risk Assessment',
        'Internal Control Review',
        'Fraud Detection',
        'Operational Efficiency Analysis',
        'Compliance Review'
      ],
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Building2,
      title: 'Company Incorporation',
      description: 'End-to-end support for business registration and incorporation.',
      features: [
        'Private Limited Company',
        'Limited Liability Partnership',
        'One Person Company',
        'Sole Proprietorship',
        'Partnership Firm',
        'NGO/Trust Registration'
      ],
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: BookOpen,
      title: 'ROC Compliance',
      description: 'Complete ROC compliance management and statutory filing services.',
      features: [
        'Annual Return Filing (MGT-7)',
        'Financial Statement Filing (AOC-4)',
        'Board Meetings & Resolutions',
        'Director KYC (DIR-3)',
        'Change in Directors/Shareholding',
        'Registered Office Changes'
      ],
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: Users,
      title: 'Accounting & Bookkeeping',
      description: 'Professional accounting and bookkeeping services for accurate financial records.',
      features: [
        'Daily Bookkeeping',
        'Financial Statements Preparation',
        'Accounts Payable/Receivable',
        'Bank Reconciliation',
        'Payroll Processing',
        'MIS Reporting'
      ],
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: TrendingUp,
      title: 'Financial Advisory',
      description: 'Strategic financial planning and investment advisory services.',
      features: [
        'Business Planning',
        'Investment Advisory',
        'Working Capital Management',
        'Financial Restructuring',
        'Mergers & Acquisitions',
        'Due Diligence'
      ],
      color: 'from-rose-500 to-rose-600'
    },
    {
      icon: DollarSign,
      title: 'Project Finance & Valuation',
      description: 'Comprehensive project financing and business valuation services.',
      features: [
        'Project Reports',
        'Business Valuation',
        'Financial Modeling',
        'Feasibility Studies',
        'Loan Syndication',
        'Bank Liaison'
      ],
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Briefcase,
      title: 'Startup Advisory',
      description: 'Specialized advisory services for startups and growing businesses.',
      features: [
        'Business Structure Advisory',
        'Funding Assistance',
        'Startup Registration',
        'Compliance Management',
        'Pitch Deck Preparation',
        'Government Scheme Advisory'
      ],
      color: 'from-violet-500 to-violet-600'
    },
    {
      icon: CheckCircle,
      title: 'Virtual CFO Services',
      description: 'Part-time CFO services providing strategic financial leadership.',
      features: [
        'Financial Planning & Analysis',
        'Cash Flow Management',
        'Budgeting & Forecasting',
        'KPI Dashboard Development',
        'Fundraising Support',
        'Board Presentation'
      ],
      color: 'from-sky-500 to-sky-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-400/30 mb-6">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Financial & Compliance Solutions
            </h1>
            <p className="text-xl text-blue-100">
              Professional services tailored to meet all your financial, taxation, and regulatory needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                  <CardContent className="p-6 space-y-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${service.color} text-white rounded-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                    <div className="pt-2">
                      <h4 className="font-semibold text-blue-900 mb-2 text-sm">Key Services:</h4>
                      <ul className="space-y-1.5">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-yellow-500 mt-0.5">•</span>
                            <span>{feature}</span>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Expert Financial Guidance?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help your business achieve financial excellence and regulatory compliance.
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

export default Services;