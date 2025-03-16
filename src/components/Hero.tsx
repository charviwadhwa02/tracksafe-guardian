
import React, { useEffect, useRef } from 'react';
import { ArrowDown, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const elements = heroRef.current.querySelectorAll('.parallax-element');
      elements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '0');
        const moveX = x * speed * 10;
        const moveY = y * speed * 10;
        (el as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32">
      <div className="container-section flex flex-col items-center" ref={heroRef}>
        <div className="badge badge-primary mb-4 animate-fade-in">Introducing TrackSafe</div>
        
        <h1 className="heading-xl text-center max-w-4xl mx-auto mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Safety and Health Monitoring in <span className="text-primary">One Device</span>
        </h1>
        
        <p className="body-lg text-center max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          TrackSafe combines accident detection with heart rate monitoring to keep you safe and healthy, providing real-time alerts and vital health data when you need it most.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Button size="lg" className="rounded-full">Get TrackSafe Now</Button>
          <Button size="lg" variant="outline" className="rounded-full">Learn More</Button>
        </div>
        
        {/* Device visualization with parallax effect */}
        <div className="relative w-full max-w-3xl mx-auto h-80 sm:h-96 md:h-[28rem]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-secondary rounded-full animate-pulse-slow">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 md:w-72 md:h-72 bg-white rounded-full border border-border shadow-lg flex items-center justify-center overflow-hidden animate-scale-in">
                  <div className="relative w-full h-full">
                    {/* Heart rate animation */}
                    <Heart className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-tracksafe-red parallax-element animate-heartbeat" data-speed="-2" />
                    {/* Shield for safety */}
                    <Shield className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 h-10 w-10 text-primary parallax-element" data-speed="1.5" />
                    {/* Center display */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 md:w-40 md:h-40 bg-tracksafe-gray-100 rounded-full border border-border shadow-md flex items-center justify-center parallax-element" data-speed="0.5">
                        <span className="text-2xl md:text-3xl font-semibold text-primary">TS</span>
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-primary/20 rounded-full parallax-element" data-speed="3"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-tracksafe-red/20 rounded-full parallax-element" data-speed="2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={scrollToFeatures}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-tracksafe-red/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
