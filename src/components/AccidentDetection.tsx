
import React, { useState, useEffect } from 'react';
import { AlertTriangle, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Contact } from './EmergencyContactForm';

interface AccidentDetectionProps {
  isTracking: boolean;
  location: { lat: number; lng: number } | null;
  contacts: Contact[];
}

const AccidentDetection: React.FC<AccidentDetectionProps> = ({
  isTracking,
  location,
  contacts
}) => {
  const { toast } = useToast();
  const [mockAccidentDetected, setMockAccidentDetected] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [alertActive, setAlertActive] = useState(false);
  const [alreadyNotified, setAlreadyNotified] = useState(false);

  // Reset states when tracking is toggled
  useEffect(() => {
    if (!isTracking) {
      setMockAccidentDetected(false);
      setAlertActive(false);
      setAlreadyNotified(false);
      setCountdown(30);
    }
  }, [isTracking]);

  // Handle countdown and automatic notification
  useEffect(() => {
    let intervalId: number;
    
    if (mockAccidentDetected && alertActive && countdown > 0) {
      intervalId = window.setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    
    if (mockAccidentDetected && alertActive && countdown === 0 && !alreadyNotified) {
      sendEmergencyAlerts();
      setAlreadyNotified(true);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [mockAccidentDetected, alertActive, countdown, alreadyNotified]);

  const sendEmergencyAlerts = () => {
    // In a real app, this would make API calls to emergency services and contacts
    console.log('Sending emergency alerts with location:', location);
    console.log('Alerting contacts:', contacts);
    
    // Show notification toast
    toast({
      title: "Emergency alerts sent",
      description: "Emergency services and your contacts have been notified.",
      variant: "destructive"
    });
    
    // In a real app, there would be API calls here to:
    // 1. Notify emergency services with location data
    // 2. Send SMS/call emergency contacts
    // 3. Potentially activate an emergency response system

    // Reset the alert state but keep record that notification happened
    setAlertActive(false);
  };

  const triggerMockAccident = () => {
    if (!isTracking || !location) return;
    
    setMockAccidentDetected(true);
    setAlertActive(true);
    setCountdown(30);
    setAlreadyNotified(false);
    
    toast({
      title: "Accident Detected",
      description: "Response countdown initiated. Cancel if this is a false alarm.",
      variant: "destructive"
    });
  };

  const cancelAlert = () => {
    setAlertActive(false);
    
    toast({
      title: "Alert Cancelled",
      description: "Emergency alert has been cancelled.",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-border">
      <h2 className="text-2xl font-semibold mb-4">Accident Detection</h2>
      
      {!isTracking ? (
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-muted-foreground">
            Enable tracking to activate accident detection
          </p>
        </div>
      ) : !mockAccidentDetected ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 text-green-700 rounded-lg">
            <div className="flex items-center mb-2">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p className="font-medium">No accidents detected</p>
            </div>
            <p className="text-sm">
              TrackSafe is actively monitoring for unusual movements or impacts.
            </p>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              For demonstration purposes, you can simulate an accident detection:
            </p>
            <Button 
              onClick={triggerMockAccident}
              variant="destructive"
              className="w-full"
            >
              Simulate Accident Detection
            </Button>
          </div>
        </div>
      ) : alertActive ? (
        <div className="space-y-4">
          <div className="p-6 bg-red-50 border-2 border-red-500 text-red-700 rounded-lg animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-bold">Accident Detected!</h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-red-200"
                onClick={cancelAlert}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="mb-4">
              Emergency services will be notified in <span className="font-bold text-xl">{countdown}</span> seconds 
              unless you cancel this alert.
            </p>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                className="bg-white hover:bg-gray-100"
                onClick={cancelAlert}
              >
                I'm Fine - Cancel
              </Button>
              
              <Button 
                variant="destructive"
                onClick={sendEmergencyAlerts}
              >
                Send Alert Now
              </Button>
            </div>
          </div>
          
          <div className="p-4 bg-white border rounded-lg">
            <h4 className="font-medium mb-2">Alert Details:</h4>
            <ul className="text-sm space-y-2">
              <li>
                <span className="font-medium">Location: </span>
                {location ? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}` : 'Unknown'}
              </li>
              <li>
                <span className="font-medium">Emergency Contacts: </span>
                {contacts.length > 0 
                  ? `${contacts.length} contact(s) will be notified` 
                  : 'No contacts available'
                }
              </li>
              <li>
                <span className="font-medium">Nearby Hospitals: </span>
                3 facilities identified
              </li>
            </ul>
          </div>
        </div>
      ) : alreadyNotified ? (
        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <p className="font-medium">Emergency services notified</p>
          </div>
          <p className="text-sm mb-4">
            Alert has been sent to emergency services and your emergency contacts.
          </p>
          <Button 
            onClick={() => {
              setMockAccidentDetected(false);
              setAlreadyNotified(false);
            }}
          >
            Reset Detection System
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default AccidentDetection;
