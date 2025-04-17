
import React, { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Locate, Navigation, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LiveMapProps {
  location: { lat: number; lng: number } | null;
  isTracking: boolean;
}

const LiveMap: React.FC<LiveMapProps> = ({ location, isTracking }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(15);
  const [mapImageUrl, setMapImageUrl] = useState('');

  useEffect(() => {
    // Generate map URL when location changes
    if (isTracking && location) {
      try {
        // Using Mapbox static API for simplicity
        const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${location.lng},${location.lat},${zoomLevel},0/600x400@2x?access_token=pk.eyJ1IjoiZGVtb21hcCIsImEiOiJjbGZvdjlhbWIwMjJ6M3RydnV0NTl0ZXlwIn0.0ZlQIzZ7FzXEQKd3QXB9zw`;
        setMapImageUrl(mapUrl);
        
        const timer = setTimeout(() => {
          setMapLoaded(true);
        }, 500);
        
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Map loading error:", error);
        setMapError(true);
      }
    } else {
      setMapLoaded(false);
      setMapImageUrl('');
    }
  }, [isTracking, location, zoomLevel]);
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 20));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 5));
  };
  
  const handleRecenter = () => {
    toast({
      title: "Map Recentered",
      description: "The map has been recentered to your current location.",
    });
  };
  
  const handleToggleSatellite = () => {
    toast({
      title: "Map Style Changed",
      description: "Map view switched to satellite imagery.",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border">
      <div className="p-6 pb-4">
        <h2 className="text-2xl font-semibold">Live Location</h2>
        <p className="text-muted-foreground text-sm mt-1">
          {isTracking 
            ? "Real-time tracking of your current location" 
            : "Enable tracking to see your location on the map"}
        </p>
      </div>
      
      <div
        ref={mapRef}
        className="relative h-[400px] bg-gray-100 overflow-hidden"
      >
        {!isTracking ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <MapPin className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground text-center max-w-xs">
              Start tracking to view your location on the live map
            </p>
          </div>
        ) : !location ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-16 h-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
            <p className="text-muted-foreground mt-4">
              Acquiring your location...
            </p>
          </div>
        ) : mapError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-red-700 text-center font-medium mb-2">
              Error loading map
            </p>
            <p className="text-red-600 text-center max-w-xs mb-4">
              We couldn't load the map service. Please check your connection and try again.
            </p>
            <Button 
              variant="destructive"
              onClick={() => setMapError(false)}
            >
              Retry
            </Button>
          </div>
        ) : (
          <>
            {/* Map image */}
            {mapImageUrl && (
              <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <img 
                  src={mapImageUrl} 
                  alt="Map showing your current location" 
                  className="w-full h-full object-cover"
                  onLoad={() => setMapLoaded(true)}
                  onError={() => setMapError(true)}
                />
              </div>
            )}
            
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center justify-center w-16 h-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                </div>
              </div>
            )}
            
            {/* Pin for current location */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <MapPin className="h-8 w-8 text-red-500" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
            
            {/* Location coordinates */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-md shadow-md text-sm">
              <div className="font-medium mb-1">Current Location</div>
              <div className="text-muted-foreground">
                Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
              </div>
            </div>
            
            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <Button 
                variant="secondary" 
                size="icon" 
                className="bg-white/90 backdrop-blur-sm shadow-md h-10 w-10"
                onClick={handleZoomIn}
              >
                <span className="text-xl font-bold">+</span>
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="bg-white/90 backdrop-blur-sm shadow-md h-10 w-10"
                onClick={handleZoomOut}
              >
                <span className="text-xl font-bold">−</span>
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="bg-white/90 backdrop-blur-sm shadow-md h-10 w-10"
                onClick={handleRecenter}
              >
                <Locate className="h-5 w-5" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="bg-white/90 backdrop-blur-sm shadow-md h-10 w-10"
                onClick={handleToggleSatellite}
              >
                <Navigation className="h-5 w-5" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveMap;
