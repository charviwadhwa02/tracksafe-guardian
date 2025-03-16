
import React, { useEffect, useRef } from 'react';
import { Shield, AlertTriangle, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Safety = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current || !contentRef.current) return;
      
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const scrollPercentage = Math.min(
        Math.max((window.innerHeight - sectionRect.top) / (window.innerHeight + sectionRect.height), 0),
        1
      );
      
      if (scrollPercentage > 0) {
        imageRef.current.style.transform = `translateY(${scrollPercentage * -50}px)`;
        contentRef.current.style.transform = `translateY(${scrollPercentage * 50}px)`;
        
        // Fade in elements as they come into view
        if (scrollPercentage > 0.1) {
          contentRef.current.classList.add('animate-fade-in');
          
          const steps = contentRef.current.querySelectorAll('.safety-step');
          steps.forEach((step, index) => {
            (step as HTMLElement).style.animationDelay = `${0.2 + index * 0.15}s`;
            step.classList.add('animate-fade-up');
          });
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section id="safety" ref={sectionRef} className="py-20 md:py-32 overflow-hidden">
      <div className="container-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          <div ref={imageRef} className="relative transition-transform duration-700 ease-out">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            
            <div className="relative bg-white rounded-3xl border border-border shadow-lg p-6 md:p-8 lg:p-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Accident Detection</h3>
                <p className="text-muted-foreground mb-4">
                  TrackSafe's advanced sensors continuously monitor for signs of accidents.
                </p>
              </div>
              
              <div className="relative z-10 rounded-2xl bg-tracksafe-gray-100 p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 p-1.5 rounded-full bg-tracksafe-red/10">
                    <AlertTriangle className="h-4 w-4 text-tracksafe-red" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Accident Detected</p>
                    <p className="text-xs text-muted-foreground">Unusual movement pattern identified</p>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 rounded-2xl bg-tracksafe-gray-100 p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 p-1.5 rounded-full bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location Shared</p>
                    <p className="text-xs text-muted-foreground">GPS coordinates sent to emergency contacts</p>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 rounded-2xl bg-tracksafe-gray-100 p-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 p-1.5 rounded-full bg-primary/10">
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Help on the Way</p>
                    <p className="text-xs text-muted-foreground">Emergency services notified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div ref={contentRef} className="transition-transform duration-700 ease-out">
            <div className="badge badge-secondary mb-4">Safety First</div>
            <h2 className="heading-lg mb-6">Automatic Accident Detection & Response</h2>
            <p className="body-md mb-8">
              TrackSafe uses sophisticated sensors to detect accidents and unusual movements, 
              ensuring help is dispatched immediately when you need it most, even if you're unable to call for help yourself.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="safety-step flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Accident Detection</h4>
                  <p className="text-muted-foreground">
                    Advanced sensors detect unusual movements, impacts, or falls.
                  </p>
                </div>
              </div>
              
              <div className="safety-step flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Immediate Response</h4>
                  <p className="text-muted-foreground">
                    Automatic alerts with a 30-second countdown to cancel false alarms.
                  </p>
                </div>
              </div>
              
              <div className="safety-step flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Location Sharing</h4>
                  <p className="text-muted-foreground">
                    Precise GPS coordinates sent to emergency services and contacts.
                  </p>
                </div>
              </div>
              
              <div className="safety-step flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  4
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Emergency Assistance</h4>
                  <p className="text-muted-foreground">
                    Help dispatched to your location with critical information.
                  </p>
                </div>
              </div>
            </div>
            
            <Button size="lg" className="rounded-full">Learn About Safety Features</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Safety;
