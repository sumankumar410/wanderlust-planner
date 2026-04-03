import { Compass, Github, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-heading font-bold gradient-text">TravelWise</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Your smart travel companion. Plan, discover, and explore the world with ease. Making travel planning effortless and enjoyable.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-card-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/destinations" className="hover:text-primary transition-colors">Destinations</Link></li>
              <li><Link to="/planner" className="hover:text-primary transition-colors">Trip Planner</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary transition-colors">Wishlist</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-card-foreground mb-4">Connect</h4>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Mail className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Github className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Made by <span className="font-semibold text-card-foreground">Gaurav Kumar</span>, <span className="font-semibold text-card-foreground">Ishan Pratap Singh</span> and <span className="font-semibold text-card-foreground">Shivam Dubey</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Students of Malout Institute of Management and Information Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
