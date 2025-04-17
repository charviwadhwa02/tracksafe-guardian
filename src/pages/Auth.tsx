
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Lock, Mail, User, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if ((isLogin && (!formData.email || !formData.password)) || 
        (!isLogin && (!formData.name || !formData.email || !formData.password))) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    // Demo authentication - in a real app, this would connect to a backend
    localStorage.setItem('tracksafe_user', JSON.stringify({ 
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      isLoggedIn: true 
    }));
    
    toast({
      title: isLogin ? "Logged in successfully" : "Account created successfully",
      description: "Welcome to TrackSafe Guardian",
    });
    
    navigate('/dashboard');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-primary">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {isLogin ? 'Sign in to continue to TrackSafe' : 'Register to start protecting yourself'}
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <div className="relative">
                      <Input
                        id="name"
                        type="text"
                        className="pl-10"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                )}
                
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    className="ml-1 text-primary hover:underline focus:outline-none"
                    onClick={switchMode}
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
