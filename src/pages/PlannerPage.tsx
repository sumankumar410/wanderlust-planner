import { useState } from "react";
import { destinations, itineraryTemplates } from "@/data/destinations";
import { MapPin, Calendar, DollarSign, Download, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function PlannerPage() {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("medium");
  const [days, setDays] = useState(3);
  const [itinerary, setItinerary] = useState<string[]>([]);

  const generatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) { toast.error("Please select a destination."); return; }
    const templates = itineraryTemplates[destination] || itineraryTemplates.default;
    const budgetPlan = templates[budget] || templates.medium;
    const plan = Array.from({ length: days }, (_, i) => budgetPlan[i % budgetPlan.length]);
    setItinerary(plan);
    toast.success("Your travel plan is ready! 🎉");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-3">Trip Planner</h1>
          <p className="text-muted-foreground">Generate a personalized travel itinerary in seconds</p>
        </div>

        <form onSubmit={generatePlan} className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-card-foreground mb-2">
                <MapPin className="w-4 h-4 text-primary" /> Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select destination</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-card-foreground mb-2">
                <DollarSign className="w-4 h-4 text-primary" /> Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="low">Budget-Friendly</option>
                <option value="medium">Mid-Range</option>
                <option value="high">Luxury</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-card-foreground mb-2">
                <Calendar className="w-4 h-4 text-primary" /> Number of Days
              </label>
              <input
                type="number"
                min={1}
                max={14}
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <button type="submit" className="mt-6 w-full gradient-primary text-primary-foreground py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" /> Generate Itinerary
          </button>
        </form>

        {itinerary.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-foreground">Your Itinerary</h2>
              <button
                onClick={() => toast.success("Plan downloaded! (simulated)")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
              >
                <Download className="w-4 h-4" /> Download Plan
              </button>
            </div>
            {itinerary.map((item, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-5 hover-lift animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                    Day {i + 1}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-card-foreground mb-1">Day {i + 1}</h3>
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
