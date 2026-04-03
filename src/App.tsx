import { useState, useCallback } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";
import { useScrollProgress } from "@/hooks/useScrollProgress";

import LoaderScreen from "@/components/LoaderScreen";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

import HomePage from "@/pages/HomePage";
import DestinationsPage from "@/pages/DestinationsPage";
import PlannerPage from "@/pages/PlannerPage";
import WishlistPage from "@/pages/WishlistPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";

import { ArrowUp } from "lucide-react";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const { user, login, signup, logout } = useAuth();
  const { wishlist, toggle: rawToggle, isWishlisted } = useWishlist();
  const { progress, showBackToTop } = useScrollProgress();

  const handleWishlistToggle = useCallback((id: string) => {
    rawToggle(id);
    toast.success(isWishlisted(id) ? "Removed from wishlist" : "Added to wishlist ❤️");
  }, [rawToggle, isWishlisted]);

  const handleLogout = useCallback(() => {
    logout();
    toast.success("Logged out successfully");
  }, [logout]);

  if (loading) return <LoaderScreen onDone={() => setLoading(false)} />;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner position="top-right" richColors />
        <BrowserRouter>
          {/* Scroll progress */}
          <div className="scroll-progress" style={{ width: `${progress}%` }} />

          <Navbar user={user} onLogout={handleLogout} onLoginClick={() => setShowAuth(true)} />

          <Routes>
            <Route path="/" element={<HomePage isWishlisted={isWishlisted} onWishlistToggle={handleWishlistToggle} />} />
            <Route path="/destinations" element={<DestinationsPage isWishlisted={isWishlisted} onWishlistToggle={handleWishlistToggle} />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} isWishlisted={isWishlisted} onWishlistToggle={handleWishlistToggle} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />

          {/* Back to top */}
          {showBackToTop && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full gradient-primary text-primary-foreground shadow-lg hover:opacity-90 transition-all flex items-center justify-center animate-scale-in"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}

          {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={login} onSignup={signup} />}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
