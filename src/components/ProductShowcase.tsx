
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  
  const features = [
    {
      title: "Sleek Design",
      description: "Lightweight and comfortable for all-day wear."
    },
    {
      title: "Water Resistant",
      description: "IP67 rated for water and dust resistance."
    },
    {
      title: "Long Battery Life",
      description: "Up to 5 days on a single charge."
    },
    {
      title: "Emergency Button",
      description: "One-press SOS alert for immediate help."
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [features.length]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!showcaseRef.current || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrollPercentage = Math.min(
        Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0),
        1
      );
      
      if (scrollPercentage > 0.1) {
        showcaseRef.current.style.opacity = "1";
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section id="showcase" className="py-20 md:py-32 overflow-hidden">
      <div className="container-section" ref={containerRef}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="badge badge-primary mb-4">Product Showcase</div>
          <h2 className="heading-lg mb-4">Designed for Life, Engineered for Safety</h2>
          <p className="body-md">
            TrackSafe combines elegant design with powerful technology to create a device that's both beautiful and life-saving.
          </p>
        </div>
        
        <div 
          ref={showcaseRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          style={{
            opacity: "0",
            transition: "opacity 0.8s ease-out"
          }}
        >
          {/* Product image */}
          <div className="relative">
            <div className="absolute -z-10 w-full h-full top-1/4 blur-3xl bg-primary/20 rounded-full"></div>
            <div className="bg-gradient-to-b from-white to-tracksafe-gray-100 rounded-3xl p-12 md:p-16 flex items-center justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64" style={{
                animation: "float 6s ease-in-out infinite"
              }}>
                <div className="absolute inset-0 bg-white rounded-full shadow-2xl"></div>
                <div className="absolute inset-2 bg-tracksafe-gray-200 rounded-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-tracksafe-gray-100 rounded-full border-4 border-white flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-primary">TS</span>
                  </div>
                </div>
                <div className="absolute top-1/4 right-0 w-6 h-6 rounded-full bg-primary border-2 border-white shadow-md"></div>
                <div className="absolute bottom-1/4 left-0 w-4 h-4 rounded-full bg-tracksafe-red border-2 border-white shadow-md"></div>
              </div>
            </div>
          </div>
          
          {/* Features carousel */}
          <div className="space-y-8">
            <div className="h-40 relative">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={cn(
                    "absolute w-full transition-all duration-500",
                    index === currentIndex 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-10 pointer-events-none"
                  )}
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentIndex ? "bg-primary scale-125" : "bg-tracksafe-gray-300"
                  )}
                  aria-label={`Go to feature ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-border shadow-sm">
                <p className="text-sm font-medium mb-1">Size</p>
                <p className="text-lg">42mm diameter</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-border shadow-sm">
                <p className="text-sm font-medium mb-1">Weight</p>
                <p className="text-lg">38 grams</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-border shadow-sm">
                <p className="text-sm font-medium mb-1">Battery</p>
                <p className="text-lg">120 hours</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-border shadow-sm">
                <p className="text-sm font-medium mb-1">Connectivity</p>
                <p className="text-lg">Bluetooth 5.2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
