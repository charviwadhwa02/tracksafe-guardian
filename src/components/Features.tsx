
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Heart, Shield, MapPin, Bell } from 'lucide-react';
import AnimatedNumber from './ui/AnimatedNumber';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, className }) => {
  return (
    <div className={cn("feature-card", className)}>
      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!featuresRef.current || !statsRef.current) return;
      
      const features = featuresRef.current;
      const stats = statsRef.current;
      
      const featureRect = features.getBoundingClientRect();
      const statsRect = stats.getBoundingClientRect();
      
      if (featureRect.top < window.innerHeight * 0.8) {
        features.style.opacity = "1";
        features.style.transform = "translateY(0)";
      }
      
      if (statsRect.top < window.innerHeight * 0.8) {
        stats.style.opacity = "1";
        
        // Apply staggered animation to stats items
        const items = stats.querySelectorAll('.stat-item');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('animate-scale-in');
          }, index * 200);
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section id="features" ref={sectionRef} className="py-20 md:py-32 bg-tracksafe-gray-100 overflow-hidden">
      <div className="container-section">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="badge badge-primary mb-4">Features</div>
          <h2 className="heading-lg mb-4">Comprehensive Safety & Health Monitoring</h2>
          <p className="body-md">
            TrackSafe combines cutting-edge technology to provide a complete safety and health monitoring solution.
          </p>
        </div>
        
        <div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          style={{
            opacity: "0",
            transform: "translateY(30px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out"
          }}
        >
          <Feature 
            icon={<Shield className="h-6 w-6" />}
            title="Accident Detection"
            description="Automatically detects accidents and unusual movements to provide immediate assistance."
          />
          <Feature 
            icon={<Heart className="h-6 w-6" />}
            title="Heart Rate Monitoring"
            description="Continuously tracks your heart rate and alerts you when it falls outside safe ranges."
          />
          <Feature 
            icon={<MapPin className="h-6 w-6" />}
            title="Real-time GPS"
            description="Precise location tracking ensures help can find you quickly in emergencies."
          />
          <Feature 
            icon={<Bell className="h-6 w-6" />}
            title="Smart Alerts"
            description="Sends immediate alerts to emergency services and designated contacts."
          />
        </div>
        
        <div 
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          style={{
            opacity: "0",
            transition: "opacity 0.8s ease-out"
          }}
        >
          <div className="stat-item p-6 rounded-2xl bg-white border border-border shadow-sm text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Response Time</p>
            <p className="text-4xl font-bold text-primary mb-1">
              <AnimatedNumber value={30} suffix="%" />
            </p>
            <p className="text-sm text-muted-foreground">Faster Emergency Response</p>
          </div>
          
          <div className="stat-item p-6 rounded-2xl bg-white border border-border shadow-sm text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">User Satisfaction</p>
            <p className="text-4xl font-bold text-tracksafe-blue mb-1">
              <AnimatedNumber value={98} suffix="%" />
            </p>
            <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
          </div>
          
          <div className="stat-item p-6 rounded-2xl bg-white border border-border shadow-sm text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Health Insights</p>
            <p className="text-4xl font-bold text-primary mb-1">
              <AnimatedNumber value={24} suffix="/7" />
            </p>
            <p className="text-sm text-muted-foreground">Continuous Monitoring</p>
          </div>
          
          <div className="stat-item p-6 rounded-2xl bg-white border border-border shadow-sm text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Battery Life</p>
            <p className="text-4xl font-bold text-tracksafe-blue mb-1">
              <AnimatedNumber value={5} suffix=" days" />
            </p>
            <p className="text-sm text-muted-foreground">On Single Charge</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
