import { Heart, Star } from "lucide-react";
import type { Destination } from "@/data/destinations";

interface DestinationCardProps {
  destination: Destination;
  isWishlisted: boolean;
  onWishlistToggle: (id: string) => void;
  onViewDetails: (dest: Destination) => void;
}

export default function DestinationCard({ destination, isWishlisted, onWishlistToggle, onViewDetails }: DestinationCardProps) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-card border border-border hover-lift">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
          width={800}
          height={600}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <button
          onClick={(e) => { e.stopPropagation(); onWishlistToggle(destination.id); }}
          className="absolute top-3 right-3 p-2 rounded-full glass transition-transform hover:scale-110"
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-destructive text-destructive" : "text-primary-foreground"}`} />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-primary-foreground">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">{destination.rating}</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-heading font-semibold text-card-foreground">{destination.name}</h3>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">{destination.country}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{destination.shortDesc}</p>
        <button
          onClick={() => onViewDetails(destination)}
          className="w-full gradient-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
