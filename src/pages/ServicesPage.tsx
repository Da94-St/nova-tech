import { ArrowRight, BarChart, CheckCircle, Clock, Globe, Headphones, Rocket, Settings, Shield, Target, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ServicesPage() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      icon: BarChart,
      title: 'AI & Data Analysis',
      description: 'Transforming raw data into strategic insights using Python, SQL, and predictive analytics. Delivered enterprise dashboards for global firms.',
      features: [
        'Predictive Modeling & Statistical Analysis',
        'Automated Data Pipelines (Python/SQL)',
        'Executive-Level Data Visualization',
        'Market & Trend Intelligence Reports'
      ],
      color: 'from-blue-500 to-cyan-600',
      featuresCount: 12,
    },
    {
      icon: Settings,
      title: 'Full-Stack Development',
      description: 'Building scalable, responsive web applications from front to back. Utilizing React.js, Node.js, TypeScript, and REST APIs for seamless user experiences.',
      features: [
        'React.js & TypeScript UI/UX',
        'Node.js & Express.js Backends',
        'REST API Integration',
        'Responsive & Accessible Design'
      ],
      color: 'from-purple-500 to-pink-600',
      featuresCount: 16,
    },
    {
      icon: Zap,
      title: 'GenAI & Automation',
      description: 'Streamlining workflows and boosting productivity through Prompt Engineering and Contextual Engineering. Integrating AI automation into CRM platforms.',
      features: [
        'Custom AI Prompt Workflows',
        'CRM Automation (Salesforce/HubSpot)',
        'Automated Report Generation',
        'Lead Scoring & Lifecycle Analytics'
      ],
      color: 'from-green-500 to-emerald-600',
      featuresCount: 10,
    },
    {
      icon: Shield,
      title: 'Cybersecurity & Audits',
      description: 'Implementing secure coding practices and ethical hacking concepts to protect your digital assets. Identifying vulnerabilities before they can be exploited.',
      features: [
        'Vulnerability Assessments',
        'Secure Coding Practices',
        'Threat Analysis & Risk Mitigation',
        'Compliance & Security Audits'
      ],
      color: 'from-orange-500 to-amber-600',
      featuresCount: 14,
    },
  ];

  const processSteps = [
    { step: '01', icon: <Target className="w-8 h-8" />, title: 'Discovery & Analysis', description: 'We analyze your current technology landscape and business objectives to identify opportunities.' },
    { step: '02', icon: <Rocket className="w-8 h-8" />, title: 'Strategy & Planning', description: 'Developing a comprehensive technology roadmap aligned with your business goals.' },
    { step: '03', icon: <Settings className="w-8 h-8" />, title: 'Implementation', description: 'Execution of the planned solutions with regular updates and milestone tracking.' },
    { step: '04', icon: <Shield className="w-8 h-8" />, title: 'Support & Optimization', description: 'Ongoing support, maintenance, and continuous improvement of implemented solutions.' },
  ];

  const stats = [
    { value: '150+', label: 'Projects Completed', icon: <CheckCircle className="w-6 h-6" /> },
    { value: '98%', label: 'Client Satisfaction', icon: <Headphones className="w-6 h-6" /> },
    { value: '24/7', label: 'Support Available', icon: <Clock className="w-6 h-6" /> },
    { value: '50+', label: 'Countries Served', icon: <Globe className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-900/50 to-blue-900/30" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-4 pt-32 pb-16 text-center max-w-6xl mx-auto">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full border border-blue-500/30 mb-6">
            <span className="text-blue-200 font-semibold text-sm">Premium Technology Services</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Transform Your <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Business</span> with Technology
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Expert technology consulting, implementation, and support services to drive innovation and growth for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
              <span className="flex items-center justify-center gap-2">Explore Our Services <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></span>
            </button>
            <button onClick={() => navigate('/contact')} className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/30 transition-all duration-300">
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-4 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-120xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="text-blue-400">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-bold text-white">{stat.value}</div>
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services-grid" className="py-16">
        <div className="max-w-120xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Premium <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology solutions tailored to your business needs, delivered by industry experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isSelected = selectedService === index;
              return (
                <div key={index} className={`bg-white rounded-3xl shadow-xl border-2 transition-all duration-500 hover:shadow-2xl group cursor-pointer ${isSelected ? 'border-blue-500 scale-[1.02]' : 'border-gray-200 hover:border-blue-300'}`} onClick={() => navigate('/contact')}>
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm font-bold rounded-full whitespace-nowrap">{service.featuresCount} features</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                    <div className="space-y-4 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-colors">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-300 group/btn flex items-center justify-center gap-2">
                      <span>Get This Service</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-110xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured approach to ensure successful project delivery and maximum value for your investment.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((phase, index) => (
                <div key={index} className="relative text-center group">
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">{phase.icon}</div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">{phase.step}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">{phase.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{phase.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-16 -right-4 z-20">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full"></div></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Rocket className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our technology experts and discover how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/contact')} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Schedule Free Consultation
            </button>
            <a href="tel:+905312539681" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 text-center flex items-center justify-center">
              Call Us Directly
            </a>
          </div>
          <p className="text-gray-400 text-sm mt-6">⚡ Get a free technology assessment worth $2,500 when you sign up today.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What industries do you serve?", a: "We serve a wide range of industries including finance, healthcare, retail, manufacturing, and technology startups." },
              { q: "How long does a typical project take?", a: "Project timelines vary based on complexity, ranging from 4 weeks for consultations to 6+ months for enterprise implementations." },
              { q: "Do you offer ongoing support?", a: "Yes, we provide 24/7 support packages with SLAs ranging from 1-hour to 4-hour response times." },
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;


