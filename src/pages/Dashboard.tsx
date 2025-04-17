
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import EmergencyContactForm, { Contact } from '@/components/EmergencyContactForm';
import LocationTracker from '@/components/LocationTracker';
import NearbyHospitals from '@/components/NearbyHospitals';
import AccidentDetection from '@/components/AccidentDetection';
import HealthMonitoring from '@/components/HealthMonitoring';
import LiveMap from '@/components/LiveMap';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { toast } = useToast();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('tracksafe_user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);
  
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
  
  // If not authenticated, show login message
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-20 flex items-center justify-center">
          <motion.div 
            className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-muted-foreground mb-6">
              You need to log in to access the TrackSafe dashboard and its features.
            </p>
            <div className="space-y-3">
              <Button 
                className="w-full" 
                onClick={() => window.location.href = '/auth'}
              >
                Log In
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = '/'}
              >
                Return to Home
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
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
                    <Button
                      onClick={stopTracking}
                      variant="destructive"
                      className="rounded-full"
                    >
                      Stop Tracking
                    </Button>
                  ) : (
                    <Button
                      onClick={startTracking}
                      className="rounded-full"
                    >
                      Start Tracking
                    </Button>
                  )}
                </div>
              </div>
              
              <LocationTracker 
                isTracking={isTracking} 
                onLocationUpdate={setLocation} 
              />
            </div>
            
            <LiveMap
              isTracking={isTracking}
              location={location}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AccidentDetection 
                isTracking={isTracking} 
                location={location}
                contacts={contacts}
              />
              
              <HealthMonitoring 
                isTracking={isTracking} 
              />
            </div>
            
            <NearbyHospitals location={location} />
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4">Emergency Contacts</h2>
              <EmergencyContactForm 
                contacts={contacts} 
                setContacts={setContacts} 
              />
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
