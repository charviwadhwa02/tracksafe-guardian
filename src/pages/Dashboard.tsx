
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmergencyContactForm from '@/components/EmergencyContactForm';
import LocationTracker from '@/components/LocationTracker';
import NearbyHospitals from '@/components/NearbyHospitals';
import AccidentDetection from '@/components/AccidentDetection';

const Dashboard = () => {
  const { toast } = useToast();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [contacts, setContacts] = useState<Array<{ name: string; phone: string; relation: string }>>([]);
  
  // Load saved contacts from localStorage on mount
  useEffect(() => {
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Start tracking location
  const startTracking = () => {
    setIsTracking(true);
    toast({
      title: "Tracking Started",
      description: "TrackSafe is now monitoring your location and movement.",
    });
  };

  // Stop tracking location
  const stopTracking = () => {
    setIsTracking(false);
    toast({
      title: "Tracking Stopped",
      description: "TrackSafe has stopped monitoring your location.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4">Current Status</h2>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-lg font-medium">
                    {isTracking ? 
                      <span className="text-green-600">Active Monitoring</span> : 
                      <span className="text-gray-500">Monitoring Disabled</span>
                    }
                  </p>
                  <p className="text-muted-foreground">
                    {isTracking ? 
                      "TrackSafe is actively monitoring your location and movement patterns." : 
                      "Enable tracking to activate accident detection."
                    }
                  </p>
                </div>
                <div>
                  {isTracking ? (
                    <button
                      onClick={stopTracking}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors"
                    >
                      Stop Tracking
                    </button>
                  ) : (
                    <button
                      onClick={startTracking}
                      className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition-colors"
                    >
                      Start Tracking
                    </button>
                  )}
                </div>
              </div>
              
              <LocationTracker 
                isTracking={isTracking} 
                onLocationUpdate={setLocation} 
              />
            </div>
            
            <AccidentDetection 
              isTracking={isTracking} 
              location={location}
              contacts={contacts}
            />
            
            <NearbyHospitals location={location} />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4">Emergency Contacts</h2>
              <EmergencyContactForm 
                contacts={contacts} 
                setContacts={setContacts} 
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
