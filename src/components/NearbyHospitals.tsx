
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  distance: number;
  address: string;
  phone: string;
}

interface NearbyHospitalsProps {
  location: { lat: number; lng: number } | null;
}

// Mock data for nearby hospitals (in a real app, this would come from an API)
const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    distance: 2.4,
    address: '123 Healthcare Ave, City Center',
    phone: '(555) 123-4567',
  },
  {
    id: '2',
    name: 'St. Mary\'s Medical Center',
    distance: 3.7,
    address: '456 Recovery Blvd, Downtown',
    phone: '(555) 987-6543',
  },
  {
    id: '3',
    name: 'County Emergency Hospital',
    distance: 5.2,
    address: '789 Emergency Road, Westside',
    phone: '(555) 345-6789',
  },
];

const NearbyHospitals: React.FC<NearbyHospitalsProps> = ({ location }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location) {
      // In a real app, this would be an API call based on the current location
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setHospitals(mockHospitals);
        setIsLoading(false);
      }, 1000);
    } else {
      setHospitals([]);
    }
  }, [location]);

  const callHospital = (phone: string) => {
    // In a real web app, this would integrate with a calling API or mobile capabilities
    console.log(`Calling hospital at: ${phone}`);
    window.open(`tel:${phone.replace(/\D/g, '')}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Nearby Hospitals</h2>
        <Button 
          onClick={() => {
            if (location) {
              setIsLoading(true);
              setTimeout(() => {
                setHospitals(mockHospitals);
                setIsLoading(false);
              }, 1000);
            }
          }}
          variant="outline"
          disabled={!location || isLoading}
        >
          Refresh
        </Button>
      </div>

      {!location ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Enable location tracking to see nearby hospitals
          </p>
        </div>
      ) : isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Finding nearby hospitals...</p>
        </div>
      ) : hospitals.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hospitals found nearby</p>
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
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center gap-1" 
                  onClick={() => callHospital(hospital.phone)}
                >
                  <Phone size={14} />
                  Call
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbyHospitals;
