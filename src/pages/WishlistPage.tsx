import { useState } from "react";
import { destinations } from "@/data/destinations";
import DestinationCard from "@/components/DestinationCard";
import DestinationModal from "@/components/DestinationModal";
import type { Destination } from "@/data/destinations";
import { Heart } from "lucide-react";

interface WishlistPageProps {
  wishlist: string[];
  isWishlisted: (id: string) => boolean;
  onWishlistToggle: (id: string) => void;
}

export default function WishlistPage({ wishlist, isWishlisted, onWishlistToggle }: WishlistPageProps) {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const saved = destinations.filter((d) => wishlist.includes(d.id));

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-3">Your Wishlist</h1>
          <p className="text-muted-foreground">Destinations you've saved for later</p>
        </div>
        {saved.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No saved destinations yet.</p>
            <p className="text-sm text-muted-foreground mt-1">Click the heart icon on any destination to add it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {saved.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                isWishlisted={isWishlisted(dest.id)}
                onWishlistToggle={onWishlistToggle}
                onViewDetails={setSelectedDest}
              />
            ))}
          </div>
        )}
      </div>
      {selectedDest && <DestinationModal destination={selectedDest} onClose={() => setSelectedDest(null)} />}
    </div>
  );
}
