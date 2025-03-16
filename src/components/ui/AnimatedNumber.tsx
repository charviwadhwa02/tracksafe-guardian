
import React, { useEffect, useState, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1000,
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const startValueRef = useRef(0);

  useEffect(() => {
    startValueRef.current = displayValue;
    startTimeRef.current = null;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const currentValue = startValueRef.current + progress * (value - startValueRef.current);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration]);
  
  // Format the number with decimals and separators
  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(displayValue);
  
  return (
    <span className={className}>
      {prefix}{formattedNumber}{suffix}
    </span>
  );
};

export default AnimatedNumber;
