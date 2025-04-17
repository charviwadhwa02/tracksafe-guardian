
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface HealthMonitoringProps {
  isTracking: boolean;
}

const HealthMonitoring: React.FC<HealthMonitoringProps> = ({ isTracking }) => {
  const { toast } = useToast();
  const [heartRate, setHeartRate] = useState(72);
  const [bloodPressure, setBloodPressure] = useState({ systolic: 120, diastolic: 80 });
  const [stressLevel, setStressLevel] = useState(35);
  const [isAbnormal, setIsAbnormal] = useState(false);
  
  // Simulate vital signs when tracking is enabled
  useEffect(() => {
    if (!isTracking) return;
    
    const interval = setInterval(() => {
      // Simulate heart rate changes
      const newHeartRate = Math.max(60, Math.min(100, heartRate + (Math.random() * 6 - 3)));
      setHeartRate(Math.round(newHeartRate));
      
      // Simulate blood pressure changes
      const newSystolic = Math.max(110, Math.min(140, bloodPressure.systolic + (Math.random() * 6 - 3)));
      const newDiastolic = Math.max(70, Math.min(90, bloodPressure.diastolic + (Math.random() * 4 - 2)));
      setBloodPressure({
        systolic: Math.round(newSystolic),
        diastolic: Math.round(newDiastolic)
      });
      
      // Simulate stress level changes
      const newStressLevel = Math.max(10, Math.min(80, stressLevel + (Math.random() * 10 - 5)));
      setStressLevel(Math.round(newStressLevel));
      
      // Check for abnormal readings
      const isHeartRateAbnormal = newHeartRate > 90 || newHeartRate < 65;
      const isBloodPressureAbnormal = newSystolic > 135 || newDiastolic > 85;
      const isStressLevelHigh = newStressLevel > 70;
      
      const isCurrentlyAbnormal = isHeartRateAbnormal || isBloodPressureAbnormal || isStressLevelHigh;
      
      // Only show alert if state changes to abnormal
      if (isCurrentlyAbnormal && !isAbnormal) {
        setIsAbnormal(true);
        toast({
          title: "Health Alert",
          description: "Abnormal health metrics detected. Please check your condition.",
          variant: "destructive",
        });
      } else if (!isCurrentlyAbnormal && isAbnormal) {
        setIsAbnormal(false);
      }
      
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isTracking, heartRate, bloodPressure, stressLevel, isAbnormal, toast]);
  
  const getHeartRateStatus = () => {
    if (heartRate > 90) return { status: "elevated", icon: TrendingUp, color: "text-amber-500" };
    if (heartRate < 65) return { status: "low", icon: TrendingDown, color: "text-blue-500" };
    return { status: "normal", icon: Activity, color: "text-green-500" };
  };
  
  const getBloodPressureStatus = () => {
    if (bloodPressure.systolic > 135 || bloodPressure.diastolic > 85) 
      return { status: "elevated", color: "text-amber-500" };
    if (bloodPressure.systolic < 115 || bloodPressure.diastolic < 75) 
      return { status: "low", color: "text-blue-500" };
    return { status: "normal", color: "text-green-500" };
  };
  
  const getStressColor = () => {
    if (stressLevel > 70) return "bg-red-500";
    if (stressLevel > 50) return "bg-amber-500";
    if (stressLevel > 30) return "bg-blue-500";
    return "bg-green-500";
  };
  
  const heartRateInfo = getHeartRateStatus();
  const bpInfo = getBloodPressureStatus();
  const IconComponent = heartRateInfo.icon;
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-border">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold">Health Monitoring</h2>
        <div className={`px-3 py-1 rounded-full ${isTracking ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} text-sm font-medium`}>
          {isTracking ? 'Active' : 'Inactive'}
        </div>
      </div>
      
      {!isTracking ? (
        <div className="text-center py-8">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground">
            Start tracking to monitor your health metrics in real-time.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Heart Rate */}
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5, 
                  ease: "easeInOut" 
                }}
                className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4"
              >
                <Heart className="h-6 w-6 text-red-500" />
              </motion.div>
              <div>
                <div className="text-sm text-muted-foreground">Heart Rate</div>
                <div className="text-2xl font-bold flex items-center">
                  {heartRate} <span className="text-sm font-normal ml-1">BPM</span>
                  <span className={`ml-2 text-sm ${heartRateInfo.color}`}>
                    <IconComponent className="h-4 w-4 inline" />
                    <span className="ml-1 capitalize">{heartRateInfo.status}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Target Zone</div>
              <div className="text-base">65-90 BPM</div>
            </div>
          </motion.div>
          
          {/* Blood Pressure */}
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Activity className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Blood Pressure</div>
                <div className="text-2xl font-bold flex items-center">
                  {bloodPressure.systolic}/{bloodPressure.diastolic} <span className="text-sm font-normal ml-1">mmHg</span>
                  <span className={`ml-2 text-sm ${bpInfo.color}`}>
                    <span className="capitalize">{bpInfo.status}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Normal Range</div>
              <div className="text-base">115-135/75-85</div>
            </div>
          </motion.div>
          
          {/* Stress Level */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-between">
              <div className="text-sm text-muted-foreground">Stress Level</div>
              <div className="text-sm font-medium">
                {stressLevel}%
                {stressLevel > 70 && (
                  <span className="ml-2 text-red-500 inline-flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" /> High
                  </span>
                )}
              </div>
            </div>
            <Progress value={stressLevel} className={getStressColor()} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>Moderate</span>
              <span>High</span>
            </div>
          </motion.div>
          
          <div className="pt-2">
            <Button 
              variant={isAbnormal ? "destructive" : "outline"} 
              className="w-full"
              onClick={() => {
                toast({
                  title: "Health Report",
                  description: "Your health report has been generated and saved to your profile.",
                });
              }}
            >
              {isAbnormal ? "Check Health Status" : "Generate Health Report"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthMonitoring;
