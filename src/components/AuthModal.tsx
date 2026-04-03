import { useState } from "react";
import { X, LogIn, UserPlus } from "lucide-react";

interface AuthModalProps {
  onClose: () => void;
  onLogin: (username: string, password: string) => { success: boolean; message: string };
  onSignup: (username: string, email: string, password: string) => { success: boolean; message: string };
}

export default function AuthModal({ onClose, onLogin, onSignup }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (!username || !password) { setMessage("All fields are required."); setIsError(true); return; }
      const res = onLogin(username, password);
      setMessage(res.message);
      setIsError(!res.success);
      if (res.success) setTimeout(onClose, 800);
    } else {
      if (!username || !email || !password) { setMessage("All fields are required."); setIsError(true); return; }
      if (password.length < 4) { setMessage("Password must be at least 4 characters."); setIsError(true); return; }
      const res = onSignup(username, email, password);
      setMessage(res.message);
      setIsError(!res.success);
      if (res.success) setTimeout(onClose, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md animate-scale-in p-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors">
          <X className="w-5 h-5 text-card-foreground" />
        </button>
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3">
            {isLogin ? <LogIn className="w-7 h-7 text-primary-foreground" /> : <UserPlus className="w-7 h-7 text-primary-foreground" />}
          </div>
          <h2 className="text-2xl font-heading font-bold text-card-foreground">{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isLogin ? "Sign in to your TravelWise account" : "Join TravelWise today"}
          </p>
        </div>
        {message && (
          <div className={`p-3 rounded-lg text-sm mb-4 ${isError ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-card-foreground mb-1 block">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Enter username"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-card-foreground mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="you@example.com"
              />
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full gradient-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-5">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setIsLogin(!isLogin); setMessage(""); }} className="text-primary font-semibold hover:underline">
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
        {isLogin && (
          <p className="text-center text-xs text-muted-foreground mt-2">
            Default: admin / 1234
          </p>
        )}
      </div>
    </div>
  );
}
