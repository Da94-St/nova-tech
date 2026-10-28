import { ArrowRight, CheckCircle, Clock, Globe, Headphones, Mail, MapPin, MessageCircle, Phone, Send, Zap, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useToaster } from '../contexts/ToasterContext';

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', priority: 'normal' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToaster();

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get detailed responses and technical assistance via email',
      action: 'Send Email',
      href: 'mailto:grayss1994@gmail.com', // Real email, hidden behind button
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Instant messaging support for quick questions and urgent matters',
      action: 'Chat on WhatsApp',
      href: 'https://wa.me/905312539681', // Real number, hidden behind button
    },
    {
      icon: Send,
      title: 'Telegram',
      description: 'Connect with us directly on Telegram for fast communication',
      action: 'Chat on Telegram',
      href: 'https://t.me/DanteV91', // Real handle, hidden behind button
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/grayss1994@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          priority: formData.priority,
          _subject: `New Contact Form Message: ${formData.subject}`
        })
      });

      if (response.ok) {
        addToast({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '', priority: 'normal' });
      } else {
        throw new Error('Failed');
      }
    } catch {
      addToast({ type: 'error', message: 'Something went wrong. Please try again or use WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const stats = [
    { value: '24/7', label: 'Support Available', icon: <Headphones className="w-6 h-6" /> },
    { value: '15 min', label: 'Avg Response Time', icon: <Clock className="w-6 h-6" /> },
    { value: '98%', label: 'Satisfaction Rate', icon: <CheckCircle className="w-6 h-6" /> },
    { value: '50+', label: 'Countries Supported', icon: <Globe className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-900/50 to-green-900/30" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-4 pt-32 pb-16 text-center max-w-6xl mx-auto">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-full border border-green-500/30 mb-6">
            <span className="text-green-200 font-semibold text-sm">24/7 Customer Support</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Get in <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Our dedicated support team is ready to help you with any questions, technical issues, or partnership inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
              <span className="flex items-center justify-center gap-2">Send Message <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-4 bg-gradient-to-r from-green-900 to-emerald-900">
        <div className="max-w-120xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="text-green-300">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-bold text-white">{stat.value}</div>
                </div>
                <div className="text-green-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-120xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Contact <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Support</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your preferred method of contact. Our team is committed to providing you with the best support experience.
          </p>
        </div>

        {/* Contact Methods (Social Icons) */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 text-center group hover:shadow-2xl transition-all duration-500 hover:scale-105 flex flex-col h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-1">
                    {method.description}
                  </p>
                  <a href={method.href} target={method.href.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer" className="w-full inline-flex bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all duration-300 group/btn items-center justify-center gap-2 mt-auto">
                    <span>{method.action}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2" id="contact-form">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 hover:shadow-3xl transition-all duration-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Enter your email" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Subject *</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="What is this regarding?" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Priority Level</label>
                    <select name="priority" value={formData.priority} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none">
                      <option value="low">Low Priority</option>
                      <option value="normal">Normal Priority</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent Priority</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none" placeholder="Please provide details about your inquiry..." />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : <><Send className="w-5 h-5" /> Send Message</>}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-500">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                Business Hours
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-bold text-gray-800">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-bold text-gray-800">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-bold text-gray-800">Emergency Only</span>
                </div>
              </div>
            </div>

            {/* Quick Support */}
            <div className="bg-gradient-to-br from-green-900 to-emerald-900 text-white rounded-3xl shadow-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                Need Immediate Help?
              </h3>
              <p className="text-green-100 mb-6">For urgent technical issues, call our 24/7 hotline.</p>
              <a href="tel:+905312539681" className="w-full bg-white text-green-700 font-bold py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Call Emergency Hotline
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
