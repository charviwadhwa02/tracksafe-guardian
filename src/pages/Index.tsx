
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Safety from '@/components/Safety';
import Health from '@/components/Health';
import ProductShowcase from '@/components/ProductShowcase';
import CallToAction from '@/components/CallToAction';

const Index = () => {
  // Smooth scroll handler for navigation links
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  // Create a more stable parallax effect on scroll
  useEffect(() => {
    const handleParallaxEffect = () => {
      const scrollY = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-scroll');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat((element as HTMLElement).dataset.speed || '0.1');
        // Limit the transform to avoid excessive movement
        const transformValue = Math.min(scrollY * speed, 100);
        (element as HTMLElement).style.transform = `translateY(${transformValue}px)`;
      });
    };
    
    window.addEventListener('scroll', handleParallaxEffect);
    return () => window.removeEventListener('scroll', handleParallaxEffect);
  }, []);

  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Features />
        <Safety />
        <Health />
        <ProductShowcase />
        <CallToAction />
      </main>
    </div>
  );
};

export default Index;
