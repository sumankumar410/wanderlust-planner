import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, MapPin, Users, Globe, Star, ChevronRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { destinations } from "@/data/destinations";
import DestinationCard from "@/components/DestinationCard";
import DestinationModal from "@/components/DestinationModal";
import type { Destination } from "@/data/destinations";

interface HomePageProps {
  isWishlisted: (id: string) => boolean;
  onWishlistToggle: (id: string) => void;
}

function AnimatedCounter({ target, label, icon: Icon }: { target: number; label: string; icon: React.ElementType }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let current = 0;
          const step = Math.ceil(target / 40);
          const interval = setInterval(() => {
            current += step;
            if (current >= target) { setCount(target); clearInterval(interval); }
            else setCount(current);
          }, 30);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center animate-count-up">
      <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
      <p className="text-3xl md:text-4xl font-heading font-bold text-card-foreground">{count.toLocaleString()}+</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export default function HomePage({ isWishlisted, onWishlistToggle }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  const filteredSuggestions = destinations.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const testimonials = [
    { name: "Priya Sharma", text: "TravelWise made planning my Bali trip so effortless! The itinerary tool is amazing.", rating: 5 },
    { name: "Rahul Verma", text: "Best travel planning platform I've used. The destination details are incredibly helpful.", rating: 5 },
    { name: "Ananya Gupta", text: "I love the wishlist feature! Saved all my dream destinations in one place.", rating: 4 },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="Travel destination" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <div className="animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary-foreground mb-6">
              <Globe className="w-4 h-4" /> Your Smart Travel Companion
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-primary-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
            Explore the World<br /><span className="gradient-text">Smarter</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
            Plan, Discover, and Travel with Ease. Your journey begins here.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.8s", opacity: 0 }}>
            <div className="relative glass rounded-2xl overflow-hidden">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search destinations..."
                className="w-full pl-12 pr-4 py-4 bg-transparent text-card-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
              />
            </div>
            {showSuggestions && searchQuery && filteredSuggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full glass rounded-xl overflow-hidden shadow-xl z-20">
                {filteredSuggestions.map((d) => (
                  <Link
                    key={d.id}
                    to="/destinations"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-card-foreground">{d.name}</span>
                    <span className="text-xs text-muted-foreground">{d.country}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: "1s", opacity: 0 }}>
            <Link to="/planner" className="gradient-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
              Start Planning <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/destinations" className="glass text-card-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-muted/50 transition-colors flex items-center gap-2">
              Explore Destinations <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <AnimatedCounter target={500} label="Destinations" icon={MapPin} />
            <AnimatedCounter target={10000} label="Happy Travelers" icon={Users} />
            <AnimatedCounter target={1200} label="Trips Planned" icon={Globe} />
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">Featured Destinations</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Handpicked destinations for your next adventure</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.slice(0, 6).map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                isWishlisted={isWishlisted(dest.id)}
                onWishlistToggle={onWishlistToggle}
                onViewDetails={setSelectedDest}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-card-foreground text-center mb-12">What Travelers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-background border border-border hover-lift">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-foreground">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedDest && <DestinationModal destination={selectedDest} onClose={() => setSelectedDest(null)} />}
    </>
  );
}
