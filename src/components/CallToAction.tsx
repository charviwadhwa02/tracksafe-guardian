
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Heart, MapPin } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-primary/5">
      <div className="container-section">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-lg mb-6">Ready to Experience Peace of Mind?</h2>
          <p className="body-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust TrackSafe for their safety and health monitoring needs. 
            Try our web dashboard today and see how TrackSafe can protect you and your loved ones.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/dashboard">
              <Button size="lg" className="rounded-full">
                Try the Dashboard
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg" className="rounded-full">
                Learn More
              </Button>
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Accident Protection</h3>
              <p className="text-muted-foreground">
                Automatic detection and response when accidents happen.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Health Monitoring</h3>
              <p className="text-muted-foreground">
                Keep track of vital signs and receive alerts for irregularities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Location Sharing</h3>
              <p className="text-muted-foreground">
                Emergency contacts receive your exact location when you need help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
