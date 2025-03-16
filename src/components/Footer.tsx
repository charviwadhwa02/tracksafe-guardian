
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 md:py-16 bg-white border-t border-border">
      <div className="container-section">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">TrackSafe</h3>
            <p className="text-sm text-muted-foreground">
              Advanced safety and health monitoring for peace of mind.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</a></li>
              <li><a href="#safety" className="text-sm text-muted-foreground hover:text-primary transition-colors">Safety</a></li>
              <li><a href="#health" className="text-sm text-muted-foreground hover:text-primary transition-colors">Health</a></li>
              <li><a href="#showcase" className="text-sm text-muted-foreground hover:text-primary transition-colors">Showcase</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Support</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2023 TrackSafe. All rights reserved.
          </p>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-tracksafe-red" fill="currentColor" />
            <span>for your safety</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
