
import React, { useEffect, useState } from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LocationTrackerProps {
  isTracking: boolean;
  onLocationUpdate: (location: { lat: number; lng: number } | null) => void;
}

const LocationTracker: React.FC<LocationTrackerProps> = ({ 
  isTracking, 
  onLocationUpdate 
}) => {
  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to check geolocation permission status
  const checkPermissionStatus = async () => {
    if (!navigator.permissions || !navigator.permissions.query) {
      // Browser doesn't support permissions API, assume granted for now
      return;
    }
    
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
      setPermissionStatus(result.state);
      
      result.addEventListener('change', () => {
        setPermissionStatus(result.state);
      });
    } catch (err) {
      console.error("Error checking geolocation permission:", err);
    }
  };

  // Request permission for geolocation
  const requestPermission = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      () => {
        checkPermissionStatus();
        setError(null);
        toast({
          title: "Success",
          description: "Location permission granted successfully",
        });
      },
      (err) => {
        setError(`Permission denied: ${err.message}`);
        checkPermissionStatus();
      }
    );
  };

  // On component mount, check permission status
  useEffect(() => {
    checkPermissionStatus();
  }, []);

  useEffect(() => {
    if (isTracking) {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        return;
      }

      // If permission is denied, don't try to watch position
      if (permissionStatus === 'denied') {
        setError("Location permission denied. Please enable location services for this site.");
        return;
      }

      // Start watching position
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationUpdate({ lat: latitude, lng: longitude });
          setLastUpdate(new Date());
          setError(null);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError(`Error: ${err.message}`);
          onLocationUpdate(null);
          checkPermissionStatus();
        },
        { 
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        }
      );
      
      setWatchId(id);
      
      // For demo purposes, simulate location if real location fails after a timeout
      // This helps users test the app without giving location permissions
      const fallbackTimer = setTimeout(() => {
        if (!lastUpdate) {
          console.log("Using fallback location data for demo");
          // Simulated location near a hospital district
          const demoLocation = { 
            lat: 34.0522, // Los Angeles area 
            lng: -118.2437 
          };
          onLocationUpdate(demoLocation);
          setLastUpdate(new Date());
          
          toast({
            description: "Using demo location data for testing purposes",
          });
        }
      }, 5000);
      
      // Clean up function
      return () => {
        if (watchId !== null) {
          navigator.geolocation.clearWatch(watchId);
        }
        clearTimeout(fallbackTimer);
      };
    } else {
      // Clear watch if tracking is disabled
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        setWatchId(null);
      }
    }
  }, [isTracking, onLocationUpdate, permissionStatus, lastUpdate, toast]);

  if (!isTracking) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg text-center">
        <p className="text-muted-foreground">Location tracking is currently disabled</p>
      </div>
    );
  }

  if (permissionStatus === 'denied') {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-medium">Location Access Required</h3>
        
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <p className="font-medium">Location permission denied</p>
          </div>
          <p className="mt-2 text-sm">
            TrackSafe needs access to your location to function properly. 
            Please enable location services for this site in your browser settings.
          </p>
          <Button 
            className="mt-3" 
            variant="default"
            onClick={requestPermission}
          >
            Request Permission Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">Location Tracking</h3>
      
      {error ? (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <p className="font-medium">Error accessing location</p>
          </div>
          <p className="text-sm">{error}</p>
          <Button 
            className="mt-3" 
            variant="default"
            onClick={requestPermission}
          >
            Try Again
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center justify-between">
            <div>
              <p className="font-medium">Location tracking active</p>
              {lastUpdate && (
                <p className="text-sm">Last update: {lastUpdate.toLocaleTimeString()}</p>
              )}
            </div>
            <div className="relative">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <div className="absolute top-0 left-0 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Your location is being tracked to provide emergency assistance in case of an accident.
            This data is only used locally and not stored on any servers.
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationTracker;
