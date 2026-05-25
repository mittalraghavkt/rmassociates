import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Linkedin, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Message Sent Successfully!',
      description: 'We will get back to you within 24 hours.',
    });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['Venkatesh Villa, Station Road', 'Chhabra, Dist. Baran', 'Rajasthan - 325220']
    },
    {
      icon: Phone,
      title: 'Phone Number',
      details: ['+91 9521452288'],
      link: 'tel:9521452288'
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['mittalraghavkt@gmail.com'],
      link: 'mailto:mittalraghavkt@gmail.com'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Monday - Saturday: 10:00 AM - 7:00 PM', 'Sunday: By Appointment']
    }
  ];

  return (
    <div className="min-h-screen" data-testid="contact-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-blue-700/40 text-blue-100 px-4 py-2 rounded-full text-sm font-semibold border border-blue-300/30 mb-6">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Discuss Your Financial Needs
            </h1>
            <p className="text-xl text-blue-100">
              Reach out to us for professional financial guidance and consultation
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 group bg-white" data-testid={`contact-info-${index}`}>
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 text-blue-900 rounded-lg border border-blue-200 group-hover:bg-blue-100 transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-blue-900">{info.title}</h3>
                    {info.link ? (
                      <a href={info.link} className="block text-gray-700 hover:text-blue-900 transition-colors">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm">{detail}</p>
                        ))}
                      </a>
                    ) : (
                      <div className="text-gray-700">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm">{detail}</p>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border border-blue-100 shadow-md bg-white">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-blue-900 mb-2">Send Us a Message</h2>
                    <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="w-full"
                        data-testid="contact-form-name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="w-full"
                        data-testid="contact-form-email"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                        className="w-full"
                        data-testid="contact-form-phone"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        className="w-full"
                        data-testid="contact-form-subject"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your requirements..."
                        required
                        rows={5}
                        className="w-full"
                        data-testid="contact-form-message"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold"
                      size="lg"
                      data-testid="contact-form-submit"
                    >
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Social Connect */}
              <Card className="border border-blue-100 shadow-md mt-6 bg-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-4">Connect With Us</h3>
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/919521452288"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group border border-blue-100"
                      data-testid="whatsapp-link"
                    >
                      <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900">WhatsApp</div>
                        <div className="text-sm text-gray-600">Quick response via WhatsApp</div>
                      </div>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/caraghavmittal25"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group border border-blue-100"
                      data-testid="linkedin-link"
                    >
                      <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900">LinkedIn</div>
                        <div className="text-sm text-gray-600">Connect professionally</div>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div>
              <Card className="border border-blue-100 shadow-md h-full bg-white">
                <CardContent className="p-0 h-full">
                  <iframe
                    src="https://www.google.com/maps?q=Chhabra,+Baran,+Rajasthan+325220&output=embed"
                    width="100%"
                    height="600"
                    style={{ border: 0, borderRadius: '0.5rem' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                    data-testid="office-map"
                  ></iframe>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact CTA */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prefer a Direct Consultation?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get in touch with us directly to discuss your financial requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:9521452288" data-testid="call-now-btn">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 shadow-xl">
                <Phone className="mr-2 w-5 h-5" />
                Call Now
              </Button>
            </a>
            <a href="https://wa.me/919521452288" target="_blank" rel="noopener noreferrer" data-testid="whatsapp-cta-btn">
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

export default Contact;
