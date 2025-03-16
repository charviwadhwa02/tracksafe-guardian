
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.75) {
        sectionRef.current.classList.add('animate-fade-in');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section className="py-20 md:py-32 bg-tracksafe-gray-100">
      <div ref={sectionRef} className="container-section opacity-0 transition-opacity duration-1000">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-tracksafe-blue p-10 md:p-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Experience Peace of Mind?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Join thousands of users who trust TrackSafe to keep them safe and healthy every day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="default" className="bg-white text-primary hover:bg-white/90 rounded-full">
                Get TrackSafe Now
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
