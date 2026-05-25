import React from 'react';
import { Calculator, FileText, BarChart3, Building2, TrendingUp, CheckCircle, Shield, Briefcase, Users, BookOpen, DollarSign, Receipt } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Reveal } from '../hooks/useScrollReveal';

const Services = () => {
  const services = [
    {
      icon: Calculator,
      title: 'Taxation Services',
      description: 'Comprehensive tax planning, filing, and advisory services for individuals and businesses.',
      features: ['Income Tax Planning & Filing', 'Corporate Tax Advisory', 'Tax Assessments & Appeals', 'Transfer Pricing', 'International Taxation', 'Tax Litigation Support']
    },
    {
      icon: FileText,
      title: 'GST Consultancy & Filing',
      description: 'Expert guidance on GST registration, compliance, and return filing.',
      features: ['GST Registration', 'Monthly/Quarterly Return Filing', 'Input Tax Credit Advisory', 'GST Audit Support', 'Refund Processing', 'GST Litigation']
    },
    {
      icon: Receipt,
      title: 'Income Tax Return Filing',
      description: 'Hassle-free ITR filing for salaried individuals, professionals, and businesses.',
      features: ['Individual ITR Filing', 'Business ITR Filing', 'Revised Return Filing', 'Loss Carry Forward', 'TDS Return Filing', 'Form 16 Verification']
    },
    {
      icon: BarChart3,
      title: 'Statutory Audit',
      description: 'Comprehensive statutory audits ensuring compliance with regulatory requirements.',
      features: ['Company Audit (Companies Act)', 'Financial Statement Audit', 'Compliance Verification', 'Audit Report Preparation', 'Board Meeting Support', 'AGM Assistance']
    },
    {
      icon: Shield,
      title: 'Internal Audit',
      description: 'Internal audit services to strengthen controls and improve operational efficiency.',
      features: ['Process Audit', 'Risk Assessment', 'Internal Control Review', 'Fraud Detection', 'Operational Efficiency Analysis', 'Compliance Review']
    },
    {
      icon: Building2,
      title: 'Company Incorporation',
      description: 'End-to-end support for business registration and incorporation.',
      features: ['Private Limited Company', 'Limited Liability Partnership', 'One Person Company', 'Sole Proprietorship', 'Partnership Firm', 'NGO/Trust Registration']
    },
    {
      icon: BookOpen,
      title: 'ROC Compliance',
      description: 'Complete ROC compliance management and statutory filing services.',
      features: ['Annual Return Filing (MGT-7)', 'Financial Statement Filing (AOC-4)', 'Board Meetings & Resolutions', 'Director KYC (DIR-3)', 'Change in Directors/Shareholding', 'Registered Office Changes']
    },
    {
      icon: Users,
      title: 'Accounting & Bookkeeping',
      description: 'Professional accounting and bookkeeping services for accurate financial records.',
      features: ['Daily Bookkeeping', 'Financial Statements Preparation', 'Accounts Payable/Receivable', 'Bank Reconciliation', 'Payroll Processing', 'MIS Reporting']
    },
    {
      icon: TrendingUp,
      title: 'Financial Advisory',
      description: 'Strategic financial planning and investment advisory services.',
      features: ['Business Planning', 'Investment Advisory', 'Working Capital Management', 'Financial Restructuring', 'Mergers & Acquisitions', 'Due Diligence']
    },
    {
      icon: DollarSign,
      title: 'Project Finance & Valuation',
      description: 'Comprehensive project financing and business valuation services.',
      features: ['Project Reports', 'Business Valuation', 'Financial Modeling', 'Feasibility Studies', 'Loan Syndication', 'Bank Liaison']
    },
    {
      icon: Briefcase,
      title: 'Startup Advisory',
      description: 'Specialized advisory services for startups and growing businesses.',
      features: ['Business Structure Advisory', 'Funding Assistance', 'Startup Registration', 'Compliance Management', 'Pitch Deck Preparation', 'Government Scheme Advisory']
    },
    {
      icon: CheckCircle,
      title: 'Virtual CFO Services',
      description: 'Part-time CFO services providing strategic financial leadership.',
      features: ['Financial Planning & Analysis', 'Cash Flow Management', 'Budgeting & Forecasting', 'KPI Dashboard Development', 'Fundraising Support', 'Board Presentation']
    }
  ];

  return (
    <div className="min-h-screen" data-testid="services-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-badge-dark mb-6 inline-block">Our Services</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-4">
              Comprehensive Financial & Compliance Solutions
            </h1>
            <p className="text-xl text-blue-100">
              Professional services tailored to meet all your financial, taxation, and regulatory needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={index} delay={(index % 3) * 100}>
                  <Card className="card-hover shadow-sm bg-white group h-full" data-testid={`service-card-${index}`}>
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 group-hover:bg-green-50 group-hover:text-green-700 group-hover:border-green-300 transition-all duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-900">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                      <div className="pt-2">
                        <h4 className="font-semibold text-blue-900 mb-2 text-sm">Key Services:</h4>
                        <ul className="space-y-1.5">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-green-600 mt-0.5">•</span>
                              <span>{feature}</span>
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
    </div>
  );
};

export default Services;
