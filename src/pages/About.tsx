import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Heart, MapPin, Car, Activity } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

const About = () => {
  const features = [
    {
      icon: Car,
      title: "Accident Detection",
      description: "Automatic detection of vehicle accidents using sophisticated motion and impact sensors."
    },
    {
      icon: Heart,
      title: "Health Monitoring",
      description: "Real-time monitoring of vital signs with alerts for abnormal conditions."
    },
    {
      icon: MapPin,
      title: "Location Tracking",
      description: "Precise GPS location tracking to quickly locate users in emergency situations."
    },
    {
      icon: Shield,
      title: "Emergency Response",
      description: "Immediate notification to emergency services and saved contacts."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Daily Commuter",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      stars: 5,
      quote: "TrackSafe has given me peace of mind during my long commutes. When I had a minor accident, emergency services were notified immediately, and my family was alerted to my location."
    },
    {
      name: "Michael Rodriguez",
      role: "Truck Driver",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 5,
      quote: "As someone who drives for a living, safety is my top priority. TrackSafe has been an essential tool that provides an extra layer of security on the road."
    },
    {
      name: "Emily Chen",
      role: "Parent",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      stars: 4,
      quote: "I installed TrackSafe for my teenage daughter who just started driving. The real-time tracking and automatic emergency response give me confidence while she's on the road."
    },
    {
      name: "David Thompson",
      role: "Adventure Enthusiast",
      image: "https://randomuser.me/api/portraits/men/86.jpg",
      stars: 5,
      quote: "When I'm off-roading or in remote areas, TrackSafe ensures I'm never truly alone. The health monitoring feature is fantastic for tracking my vitals during strenuous activities."
    }
  ];

  const stats = [
    { value: "94%", label: "Accident Detection Rate" },
    { value: "15m+", label: "Miles Tracked" },
    { value: "3.5k+", label: "Lives Potentially Saved" },
    { value: "99.9%", label: "Uptime Reliability" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-secondary/5">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">About TrackSafe Guardian</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                TrackSafe is dedicated to revolutionizing road safety through innovative technology and real-time monitoring.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  At TrackSafe, our mission is to enhance road safety and provide peace of mind through advanced technology. We believe that everyone deserves to feel secure while traveling, whether it's a daily commute or a cross-country journey.
                </p>
                <p className="text-lg text-muted-foreground">
                  We're committed to developing solutions that not only respond to emergencies but actively work to prevent them, using data-driven insights and cutting-edge technology to make roads safer for everyone.
                </p>
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                <motion.div 
                  className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-cover bg-center"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-2xl font-bold">Protecting Lives</div>
                  <div className="text-sm opacity-80">Through innovative technology</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">How TrackSafe Works</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our comprehensive solution combines multiple technologies to provide a seamless safety experience.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="p-6">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Hear from our users about how TrackSafe has impacted their lives and provided peace of mind.
              </p>
            </motion.div>

            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                    <motion.div 
                      className="h-full p-6 bg-white rounded-xl shadow-md border border-gray-100"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.stars
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{testimonial.quote}</p>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8 gap-2">
                <CarouselPrevious className="relative inset-0 translate-y-0" />
                <CarouselNext className="relative inset-0 translate-y-0" />
              </div>
            </Carousel>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
