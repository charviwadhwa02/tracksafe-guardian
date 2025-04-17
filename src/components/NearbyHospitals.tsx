
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Loader2, Hospital } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Hospital {
  id: string;
  name: string;
  distance: number;
  address: string;
  phone: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface NearbyHospitalsProps {
  location: { lat: number; lng: number } | null;
}

const NearbyHospitals: React.FC<NearbyHospitalsProps> = ({ location }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Function to generate semi-realistic hospital data based on current location
  const generateNearbyHospitals = (lat: number, lng: number) => {
    // Generate 3-5 hospitals with randomized distances and slight location variations
    const count = Math.floor(Math.random() * 3) + 3; // 3 to 5 hospitals
    const hospitalNames = [
      "City General Hospital",
      "St. Mary's Medical Center",
      "County Emergency Hospital",
      "Sunshine Medical Center",
      "Metro Health Hospital",
      "Lakeside Medical Center",
      "Central Emergency Care",
      "Regional Medical Center"
    ];
    
    const addresses = [
      "123 Healthcare Ave",
      "456 Recovery Blvd",
      "789 Emergency Road",
      "234 Medical Drive",
      "567 Wellness Street",
      "890 Hospital Lane",
      "345 Care Avenue",
      "678 Health Parkway"
    ];
    
    const areas = [
      "City Center",
      "Downtown",
      "Westside",
      "East District",
      "North Hills",
      "Southview",
      "Central Park",
      "Riverside"
    ];

    const result: Hospital[] = [];
    
    // Create a set to track used names
    const usedNames = new Set<string>();
    
    for (let i = 0; i < count; i++) {
      // Get a random name that hasn't been used yet
      let nameIndex;
      let hospitalName;
      do {
        nameIndex = Math.floor(Math.random() * hospitalNames.length);
        hospitalName = hospitalNames[nameIndex];
      } while (usedNames.has(hospitalName));
      
      usedNames.add(hospitalName);
      
      // Random offset from current location (between -0.01 and 0.01 degrees)
      const latOffset = (Math.random() * 0.02 - 0.01);
      const lngOffset = (Math.random() * 0.02 - 0.01);
      
      // Calculate a realistic distance (1-10 km)
      const distance = Math.round((Math.random() * 9 + 1) * 10) / 10;
      
      // Generate a random US-style phone number
      const areaCode = Math.floor(Math.random() * 900) + 100;
      const firstPart = Math.floor(Math.random() * 900) + 100;
      const secondPart = Math.floor(Math.random() * 9000) + 1000;
      const phone = `(${areaCode}) ${firstPart}-${secondPart}`;
      
      // Get random address components
      const addressIndex = Math.floor(Math.random() * addresses.length);
      const areaIndex = Math.floor(Math.random() * areas.length);
      
      result.push({
        id: `hospital-${i + 1}`,
        name: hospitalName,
        distance: distance,
        address: `${addresses[addressIndex]}, ${areas[areaIndex]}`,
        phone: phone,
        coordinates: {
          lat: lat + latOffset,
          lng: lng + lngOffset
        }
      });
    }
    
    // Sort by distance
    return result.sort((a, b) => a.distance - b.distance);
  };

  useEffect(() => {
    if (location) {
      setIsLoading(true);
      
      // Simulate API call delay
      const timer = setTimeout(() => {
        try {
          const nearbyHospitals = generateNearbyHospitals(location.lat, location.lng);
          setHospitals(nearbyHospitals);
          setIsLoading(false);
        } catch (error) {
          console.error("Error generating hospital data:", error);
          setIsLoading(false);
          toast({
            title: "Error",
            description: "Failed to load nearby hospitals",
            variant: "destructive"
          });
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      setHospitals([]);
    }
  }, [location, toast]);

  const refreshHospitals = () => {
    if (location) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const nearbyHospitals = generateNearbyHospitals(location.lat, location.lng);
        setHospitals(nearbyHospitals);
        setIsLoading(false);
        
        toast({
          title: "Hospitals Updated",
          description: `Found ${nearbyHospitals.length} hospitals near your location`,
        });
      }, 1000);
    }
  };

  const callHospital = (phone: string, hospitalName: string) => {
    // In a real web app, this would integrate with a calling API or mobile capabilities
    console.log(`Calling hospital at: ${phone}`);
    window.open(`tel:${phone.replace(/\D/g, '')}`);
    
    toast({
      title: "Calling Hospital",
      description: `Initiating call to ${hospitalName}`,
    });
  };

  const getDirections = (hospital: Hospital) => {
    if (hospital.coordinates && location) {
      // In a real app, this would open Google Maps or similar
      const url = `https://www.google.com/maps/dir/${location.lat},${location.lng}/${hospital.coordinates.lat},${hospital.coordinates.lng}`;
      window.open(url, '_blank');
      
      toast({
        title: "Opening Directions",
        description: `Getting directions to ${hospital.name}`,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Hospital className="h-6 w-6 text-primary mr-2" />
          <h2 className="text-2xl font-semibold">Nearby Hospitals</h2>
        </div>
        <Button 
          onClick={refreshHospitals}
          variant="outline"
          disabled={!location || isLoading}
          className="flex items-center gap-1"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
          Refresh
        </Button>
      </div>

      {!location ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground">
            Enable location tracking to see nearby hospitals
          </p>
        </div>
      ) : isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Finding nearby hospitals...</p>
        </div>
      ) : hospitals.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Hospital className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground">No hospitals found nearby</p>
          <Button className="mt-4" onClick={refreshHospitals}>
            Try Again
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <div 
              key={hospital.id} 
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{hospital.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{hospital.address}</p>
                  <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {hospital.distance.toFixed(1)} km away
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center gap-1" 
                    onClick={() => getDirections(hospital)}
                  >
                    <MapPin size={14} />
                    Directions
                  </Button>
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="flex items-center gap-1" 
                    onClick={() => callHospital(hospital.phone, hospital.name)}
                  >
                    <Phone size={14} />
                    Call
                  </Button>
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {hospital.phone}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbyHospitals;
