
import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (isTracking) {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
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
          setError(`Error: ${err.message}`);
          onLocationUpdate(null);
        },
        { 
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        }
      );
      
      setWatchId(id);
      
      // Clean up function
      return () => {
        if (watchId !== null) {
          navigator.geolocation.clearWatch(watchId);
        }
      };
    } else {
      // Clear watch if tracking is disabled
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        setWatchId(null);
      }
    }
  }, [isTracking, onLocationUpdate]);

  if (!isTracking) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg text-center">
        <p className="text-muted-foreground">Location tracking is currently disabled</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">Location Tracking</h3>
      
      {error ? (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
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
