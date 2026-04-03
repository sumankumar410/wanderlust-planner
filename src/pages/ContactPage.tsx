import { useState } from "react";
import { Send, MapPin, Mail, MessageSquare, User } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) { toast.error("Please fill in all fields."); return; }
    toast.success("Message sent! We'll get back to you soon.");
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-3">Get in Touch</h1>
          <p className="text-muted-foreground">We'd love to hear from you</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* About */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">About TravelWise</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              TravelWise is your smart travel companion designed to make trip planning effortless. 
              From discovering stunning destinations to generating personalized itineraries, 
              we help you explore the world smarter. Our platform combines beautiful design 
              with powerful planning tools to ensure every journey is memorable.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm">Malout Institute of Management and Information Technology</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm">hello@travelwise.com</span>
              </div>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-card-foreground mb-2">
                <User className="w-4 h-4 text-primary" /> Name
              </label>
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-card-foreground mb-2">
                <Mail className="w-4 h-4 text-primary" /> Email
              </label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-card-foreground mb-2">
                <MessageSquare className="w-4 h-4 text-primary" /> Message
              </label>
              <textarea
                value={message} onChange={(e) => setMessage(e.target.value)} rows={4}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Your message..."
              />
            </div>
            <button type="submit" className="w-full gradient-primary text-primary-foreground py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
