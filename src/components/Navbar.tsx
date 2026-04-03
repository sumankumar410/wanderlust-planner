import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Heart, Map, Compass, Home, Phone, LogIn, User } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface NavbarProps {
  user: { username: string } | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

export default function Navbar({ user, onLogout, onLoginClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle: toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/destinations", label: "Destinations", icon: Compass },
    { to: "/planner", label: "Planner", icon: Map },
    { to: "/wishlist", label: "Wishlist", icon: Heart },
    { to: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <Compass className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-heading font-bold gradient-text">TravelWise</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                location.pathname === link.to
                  ? "gradient-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground flex items-center gap-1">
                <User className="w-4 h-4" /> {user.username}
              </span>
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="gradient-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4" /> Login
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-xl p-4 animate-scale-in">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "gradient-primary text-primary-foreground"
                  : "text-foreground/70 hover:bg-muted"
              }`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted transition-colors">
              {isDark ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
            </button>
            {user ? (
              <button onClick={() => { onLogout(); setMobileOpen(false); }} className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground">
                Logout ({user.username})
              </button>
            ) : (
              <button onClick={() => { onLoginClick(); setMobileOpen(false); }} className="flex-1 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
