import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Define slide data with actual text
  const slides = [
    {
      id: 1,
      image: 'https://i.pinimg.com/1200x/09/10/3a/09103a291c0306f887c9ba0fe5011d8e.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Discover Cutting-Edge Technology',
      subtitle: 'Explore our premium collection of innovative tech products designed for the modern world.',
      cta: 'Shop Now',
      link: '/products',
      badge: 'New Arrivals',
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      id: 2,
      image: 'https://i.pinimg.com/1200x/94/94/09/949409d84355a2e874dfd371afd5d344.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Premium Tech Solutions',
      subtitle: 'Transform your business with our enterprise-grade technology services and consulting.',
      cta: 'Explore Services',
      link: '/services',
      badge: 'Business Solutions',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 3,
      image: 'https://i.pinimg.com/1200x/5d/d8/3a/5dd83a333a1327e4334f723410694205.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Innovation at Its Finest',
      subtitle: 'Join the revolution with groundbreaking products that redefine possibilities.',
      cta: 'View Innovations',
      link: '/products',
      badge: 'Innovation',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      id: 4,
      image: 'https://i.pinimg.com/1200x/df/3a/a3/df3aa352297bee544afa0e7ad187a0a4.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Sustainable Technology',
      subtitle: 'Eco-friendly tech solutions that power progress without compromising our planet.',
      cta: 'Learn More',
      link: '/sustainability',
      badge: 'Eco-Friendly',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 5,
      image: 'https://i.pinimg.com/1200x/10/bd/ce/10bdcee5acece5da5ea77a89d61ee653.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Cloud & AI Integration',
      subtitle: 'Seamlessly integrate cloud computing and AI into your operations for maximum efficiency.',
      cta: 'Explore Cloud',
      link: '/cloud',
      badge: 'AI Technology',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 6,
      image: 'https://i.pinimg.com/1200x/b7/04/b6/b704b6f847c8f943baa3102d2c16c54b.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Enterprise Security',
      subtitle: 'Advanced security solutions to protect your digital assets and ensure business continuity.',
      cta: 'Secure Your Business',
      link: '/security',
      badge: 'Security First',
      gradient: 'from-gray-800 to-gray-900'
    },
    {
      id: 7,
      image: 'https://i.pinimg.com/1200x/af/4d/a2/af4da2ca520d15d1f1fee6ee8b034a5a.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Peerless Services Quality',
      subtitle: 'Experience unmatched service quality with our dedicated support and expert guidance.',
      cta: 'Learn More',
      link: '/services',
      badge: 'Service Excellence',
      gradient: 'from-blue-500 to-cyan-600'
    }
  ];

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === ' ') {
      e.preventDefault();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section 
      className="relative w-full h-screen"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Hero slideshow"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Parallax */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40" />
            
            {/* Animated Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Content - Matches other pages' banner style */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-6xl mx-auto px-4">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-white/10 to-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
                <span className="text-white font-semibold text-sm">{slide.badge}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
  {slide.title.split(' ').map((word, i) => (
    <span key={i} className="inline-block mr-3">
      {word}
    </span>
  ))}
</h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                {slide.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={slide.link} 
                  className={`bg-gradient-to-r ${slide.gradient} text-white font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {slide.cta}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                </a>
                <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/30 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 bottom-16 flex items-center justify-center gap-6 z-20">
        <button
          onClick={goToPrevious}
          className="bg-white/10 backdrop-blur-md rounded-full p-3 hover:bg-white/20 transition-all duration-200 border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white/10 backdrop-blur-md rounded-full p-3 hover:bg-white/20 transition-all duration-200 border border-white/20"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </button>

        <button
          onClick={goToNext}
          className="bg-white/10 backdrop-blur-md rounded-full p-3 hover:bg-white/20 transition-all duration-200 border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 z-20">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-1000 ease-linear"
          style={{ 
            width: isPlaying && !isPaused ? '100%' : '0%',
            transition: isPlaying && !isPaused ? 'width 5s linear' : 'none'
          }}
        />
      </div>
    </section>
  );
}

export default HeroSlideshow;

