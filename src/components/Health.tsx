
import React, { useEffect, useRef } from 'react';
import { Heart, Activity, AlertCircle, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Health = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !contentRef.current || !chartRef.current) return;
      
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const scrollPercentage = Math.min(
        Math.max((window.innerHeight - sectionRect.top) / (window.innerHeight + sectionRect.height), 0),
        1
      );
      
      if (scrollPercentage > 0) {
        contentRef.current.style.transform = `translateY(${scrollPercentage * -50}px)`;
        chartRef.current.style.transform = `translateY(${scrollPercentage * 50}px)`;
        
        // Fade in elements as they come into view
        if (scrollPercentage > 0.1) {
          contentRef.current.classList.add('animate-fade-in');
          
          const steps = contentRef.current.querySelectorAll('.health-feature');
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

  // Simulate heart rate data
  const heartRateData = [78, 75, 72, 74, 76, 80, 85, 88, 87, 85, 82, 78, 76, 75, 74, 76, 80, 83, 85, 84, 82, 79, 76, 75];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  return (
    <section id="health" ref={sectionRef} className="py-20 md:py-32 bg-tracksafe-gray-100 overflow-hidden">
      <div className="container-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          <div ref={contentRef} className="transition-transform duration-700 ease-out md:order-2">
            <div className="badge badge-primary mb-4">Health Monitoring</div>
            <h2 className="heading-lg mb-6">Continuous Heart Rate Monitoring & Analysis</h2>
            <p className="body-md mb-8">
              TrackSafe monitors your heart rate 24/7, providing insights into your health 
              and alerting you to potentially dangerous conditions, enabling proactive health management.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="health-feature p-5 bg-white rounded-2xl border border-border shadow-sm">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-4">
                  <Heart className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-medium mb-2">24/7 Monitoring</h4>
                <p className="text-sm text-muted-foreground">
                  Continuous heart rate tracking throughout your day and night.
                </p>
              </div>
              
              <div className="health-feature p-5 bg-white rounded-2xl border border-border shadow-sm">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-4">
                  <Activity className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-medium mb-2">Trend Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Track patterns over time to identify health improvements.
                </p>
              </div>
              
              <div className="health-feature p-5 bg-white rounded-2xl border border-border shadow-sm">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-4">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-medium mb-2">Abnormality Alerts</h4>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when your heart rate is outside safe ranges.
                </p>
              </div>
              
              <div className="health-feature p-5 bg-white rounded-2xl border border-border shadow-sm">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-4">
                  <Smartphone className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-medium mb-2">Mobile Integration</h4>
                <p className="text-sm text-muted-foreground">
                  Access your health data anytime through the TrackSafe app.
                </p>
              </div>
            </div>
            
            <Button size="lg" className="rounded-full">Explore Health Features</Button>
          </div>
          
          <div ref={chartRef} className="transition-transform duration-700 ease-out md:order-1">
            <div className="relative">
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-tracksafe-red/10 rounded-full blur-3xl"></div>
              
              <div className="relative bg-white rounded-3xl border border-border shadow-lg p-6 md:p-8 overflow-hidden">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">Heart Rate</h3>
                      <p className="text-sm text-muted-foreground">Today's overview</p>
                    </div>
                    <div className="flex items-center space-x-1 text-tracksafe-red">
                      <Heart className="h-5 w-5 animate-pulse" fill="currentColor" />
                      <span className="text-lg font-semibold">76</span>
                      <span className="text-sm">BPM</span>
                    </div>
                  </div>
                </div>
                
                <div className="aspect-[4/3] w-full">
                  <div className="relative h-full w-full">
                    {/* Heart rate visualization graph */}
                    <div className="absolute inset-0 flex items-end">
                      <div className="w-full h-full flex items-end">
                        {heartRateData.map((rate, index) => {
                          const normalizedHeight = ((rate - 70) / 30) * 100; // Normalize between 70-100 BPM
                          return (
                            <div 
                              key={index}
                              className="flex-1 group relative"
                              style={{ height: '100%' }}
                            >
                              <div 
                                className="absolute bottom-0 w-full bg-primary opacity-80 rounded-t"
                                style={{ 
                                  height: `${normalizedHeight}%`,
                                  transition: 'height 0.5s ease-in-out',
                                  animationDelay: `${index * 0.05}s`,
                                }}
                              ></div>
                              
                              {/* Tooltip on hover */}
                              <div className="hidden group-hover:block absolute -top-12 left-1/2 transform -translate-x-1/2 bg-foreground text-white text-xs py-1 px-2 rounded shadow-md">
                                {rate} BPM
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-t-foreground border-l-transparent border-r-transparent"></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Time labels */}
                    <div className="absolute bottom-0 left-0 right-0 pt-2 border-t border-border flex justify-between text-xs text-muted-foreground">
                      <span>12 AM</span>
                      <span>6 AM</span>
                      <span>12 PM</span>
                      <span>6 PM</span>
                      <span>12 AM</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-xl bg-tracksafe-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-sm font-medium">Today's Average</span>
                    </div>
                    <span className="text-sm font-semibold">79 BPM</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-primary/40"></div>
                      <span className="text-sm font-medium">Resting Rate</span>
                    </div>
                    <span className="text-sm font-semibold">72 BPM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Health;
