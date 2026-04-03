import { useState } from "react";
import { destinations } from "@/data/destinations";
import DestinationCard from "@/components/DestinationCard";
import DestinationModal from "@/components/DestinationModal";
import type { Destination } from "@/data/destinations";
import { Search } from "lucide-react";

interface DestinationsPageProps {
  isWishlisted: (id: string) => boolean;
  onWishlistToggle: (id: string) => void;
}

export default function DestinationsPage({ isWishlisted, onWishlistToggle }: DestinationsPageProps) {
  const [search, setSearch] = useState("");
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  const filtered = destinations.filter(
    (d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-3">Explore Destinations</h1>
          <p className="text-muted-foreground">Discover amazing places across India and the world</p>
        </div>
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or country..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isWishlisted={isWishlisted(dest.id)}
              onWishlistToggle={onWishlistToggle}
              onViewDetails={setSelectedDest}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">No destinations found matching "{search}"</p>
        )}
      </div>
      {selectedDest && <DestinationModal destination={selectedDest} onClose={() => setSelectedDest(null)} />}
    </div>
  );
}
