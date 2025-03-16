
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Safety from '@/components/Safety';
import Health from '@/components/Health';
import ProductShowcase from '@/components/ProductShowcase';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

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

  // Create a subtle parallax effect on scroll
  useEffect(() => {
    const handleParallaxEffect = () => {
      const scrollY = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-scroll');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat((element as HTMLElement).dataset.speed || '0');
        (element as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    
    window.addEventListener('scroll', handleParallaxEffect);
    return () => window.removeEventListener('scroll', handleParallaxEffect);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Safety />
        <Health />
        <ProductShowcase />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
