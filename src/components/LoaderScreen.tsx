import { useState, useEffect } from "react";
import { Compass } from "lucide-react";

interface LoaderScreenProps {
  onDone: () => void;
}

export default function LoaderScreen({ onDone }: LoaderScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setTimeout(onDone, 300); return 100; }
        return p + 4;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[200] gradient-primary flex flex-col items-center justify-center gap-6">
      <div className="animate-pulse-glow p-4 rounded-2xl">
        <Compass className="w-16 h-16 text-primary-foreground animate-spin" style={{ animationDuration: "3s" }} />
      </div>
      <h1 className="text-3xl font-heading font-bold text-primary-foreground">TravelWise</h1>
      <div className="w-48 h-1.5 bg-primary-foreground/20 rounded-full overflow-hidden">
        <div className="h-full bg-primary-foreground rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
