
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const elements = containerRef.current.querySelectorAll('.parallax-element');
      elements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '0');
        (el as HTMLElement).style.transform = `translate(${-x * 20 * speed}px, ${-y * 20 * speed}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-gray-50 pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container-section relative z-10" ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-6 items-center">
          <div className="flex-1 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
            <h1 className="heading-xl mb-4 md:mb-6">
              Your Guardian on the Road
            </h1>
            <p className="body-xl mb-8 max-w-xl mx-auto lg:mx-0">
              TrackSafe detects accidents in real-time, automatically alerts emergency services, and shares your location with loved ones when every second counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/dashboard">
                <Button size="lg" className="rounded-full">
                  Try the Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg" className="rounded-full">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
          
          <div className="flex-1 relative max-w-lg">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-md rounded-full bg-primary/10 blur-3xl"></div>
            
            <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-border p-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <img 
                src="/placeholder.svg" 
                alt="TrackSafe Device" 
                className="w-full h-auto object-cover rounded-lg mb-6 parallax-element"
                data-speed="0.5"
              />
              
              <div className="relative flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">TrackSafe Guardian</h3>
                  <p className="text-muted-foreground">Next-Gen Accident Detection</p>
                </div>
                <Link to="/dashboard">
                  <Button size="sm" className="rounded-full">
                    Try Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
    </section>
  );
};

export default Hero;
