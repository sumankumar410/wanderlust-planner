import { X, Star, MapPin, Calendar, DollarSign, Landmark } from "lucide-react";
import type { Destination } from "@/data/destinations";

interface DestinationModalProps {
  destination: Destination;
  onClose: () => void;
}

export default function DestinationModal({ destination, onClose }: DestinationModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full glass hover:bg-muted transition-colors">
          <X className="w-5 h-5 text-card-foreground" />
        </button>
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <div className="absolute bottom-4 left-6">
            <h2 className="text-3xl font-heading font-bold text-card-foreground">{destination.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">{destination.country}</span>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 ml-2" />
              <span className="text-sm font-semibold text-card-foreground">{destination.rating}</span>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <p className="text-muted-foreground leading-relaxed">{destination.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted">
              <Calendar className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Best Time to Visit</p>
                <p className="text-sm font-semibold text-card-foreground">{destination.bestTime}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted">
              <DollarSign className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Budget Estimate</p>
                <p className="text-sm font-semibold text-card-foreground">{destination.budget}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Landmark className="w-5 h-5 text-primary" />
              <h3 className="font-heading font-semibold text-card-foreground">Top Attractions</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {destination.topAttractions.map((a) => (
                <span key={a} className="px-3 py-1.5 rounded-full text-xs font-medium gradient-primary text-primary-foreground">
                  {a}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-border">
            <iframe
              title={`Map of ${destination.name}`}
              width="100%"
              height="250"
              loading="lazy"
              src={`https://www.google.com/maps?q=${destination.mapQuery}&output=embed`}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
