import { ArrowRight, Award, CheckCircle, ChevronRight, Clock, Globe, Headphones, Heart, Lightbulb, Rocket, Sparkles, Target, Users, Zap } from 'lucide-react';

function AboutPage() {
  const stats = [
    { label: 'Years of Innovation', value: '15+', icon: Sparkles },
    { label: 'Products Sold', value: '500K+', icon: Zap },
    { label: 'Countries Reached', value: '50+', icon: Globe },
    { label: 'Team Members', value: '200+', icon: Users },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what\'s possible, embracing new ideas and technologies to create groundbreaking products.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Customer Obsession',
      description: 'Our customers are at the heart of every decision. We listen, learn, and adapt to deliver exceptional experiences.',
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for perfection in every detail, from design to performance, ensuring the highest quality in everything we do.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Positive Impact',
      description: 'We are committed to making a positive difference in the world through sustainable practices and community engagement.',
      color: 'from-green-500 to-emerald-500'
    },
  ];

  const bannerStats = [
    { value: '150+', label: 'Projects Completed', icon: <CheckCircle className="w-6 h-6" /> },
    { value: '98%', label: 'Client Satisfaction', icon: <Headphones className="w-6 h-6" /> },
    { value: '24/7', label: 'Support Available', icon: <Clock className="w-6 h-6" /> },
    { value: '50+', label: 'Countries Served', icon: <Globe className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Banner - Matching ServicesPage Style */}
      <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-900/50 to-blue-900/30" />
          
          {/* Animated Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 pt-32 pb-16">
          <div className="text-center max-w-6xl mx-auto">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full border border-blue-500/30 mb-6">
              <span className="text-blue-200 font-semibold text-sm">Pioneering Technology Since 2010</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              About <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">NovaTech</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              We're on a mission to revolutionize how the world interacts with technology, creating products and experiences that inspire, empower, and transform lives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group"
              >
                <span className="flex items-center justify-center gap-2">
                  Our Mission
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
              <button 
                onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/30 transition-all duration-300"
              >
                Meet Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Matching ServicesPage */}
      <section className="py-4 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-120xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bannerStats.map((stat, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="text-blue-400">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white">{stat.value}</div>
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of the content remains the same */}
      <div className="max-w-120xl mx-auto px-4 py-16">
        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20" id="mission">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
              Our Purpose
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Driving innovation forward with a clear vision and unwavering mission
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 hover:shadow-3xl transition-all duration-500 group hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Our Mission
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To create technology that enriches people's lives by making it more connected, efficient, and enjoyable. 
                We believe in innovation that serves humanity and builds a sustainable future for generations to come.
              </p>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-orange-600 font-bold">
                  <span>Learn more about our impact</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 group hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">
                  Our Vision
                </h3>
              </div>
              <p className="text-lg text-white/90 leading-relaxed">
                To be the world's most trusted and beloved tech brand, known for pushing boundaries and creating 
                products that become an integral part of everyday life, transforming how people work, play, and connect.
              </p>
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <span>See our roadmap</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 group hover:scale-105"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-200">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                      <span>Learn more</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20" id="team">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate visionaries driving innovation forward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Sarah Chen', 
                role: 'CEO & Founder', 
                image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
                bio: 'With over 15 years in tech, Sarah founded NovaTech with a vision to make cutting-edge technology accessible to everyone.',
                color: 'from-orange-500 to-amber-500'
              },
              { 
                name: 'Marcus Rodriguez', 
                role: 'Head of Product', 
                image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
                bio: 'Marcus leads our product innovation, ensuring every device meets the highest standards of design and functionality.',
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                name: 'Elena Petrova', 
                role: 'Chief Technology Officer', 
                image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400',
                bio: 'Elena drives our technological advancements, building the future with her team of engineers and developers.',
                color: 'from-purple-500 to-pink-500'
              },
            ].map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 text-center group hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute bottom-0 right-8 w-8 h-8 bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center border-2 border-white`}>
                    <span className="text-xs font-bold text-white">✓</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className={`text-lg font-bold bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-4`}>
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <span className="text-lg font-semibold">in</span>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <span className="sr-only">Twitter</span>
                    𝕏
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section - Matching ServicesPage */}
        <section className="bg-gradient-to-r from-gray-900 to-black rounded-3xl shadow-2xl overflow-hidden relative">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative p-8 md:p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Rocket className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Join Our Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Be part of our story as we continue to innovate and shape the future of technology.
              Together, we're building something extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Get in Touch
              </a>
              <a href="/products" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300">
                View Products
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              ⚡ Get exclusive insights and early access to new products.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;

