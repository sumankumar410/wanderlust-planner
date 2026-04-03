import { useState, useEffect, useCallback } from "react";

interface User {
  username: string;
  email: string;
}

interface StoredUser extends User {
  password: string;
}

const DEFAULT_USERS: StoredUser[] = [
  { username: "admin", email: "admin@travelwise.com", password: "1234" },
];

function getUsers(): StoredUser[] {
  const stored = localStorage.getItem("tw_users");
  if (!stored) {
    localStorage.setItem("tw_users", JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
  return JSON.parse(stored);
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("tw_session");
    if (session) setUser(JSON.parse(session));
  }, []);

  const login = useCallback((username: string, password: string): { success: boolean; message: string } => {
    const users = getUsers();
    const found = users.find(
      (u) => (u.username === username || u.email === username) && u.password === password
    );
    if (found) {
      const userData = { username: found.username, email: found.email };
      localStorage.setItem("tw_session", JSON.stringify(userData));
      setUser(userData);
      return { success: true, message: `Welcome back, ${found.username}!` };
    }
    return { success: false, message: "Invalid credentials. Please try again." };
  }, []);

  const signup = useCallback((username: string, email: string, password: string): { success: boolean; message: string } => {
    const users = getUsers();
    if (users.find((u) => u.username === username)) {
      return { success: false, message: "Username already exists." };
    }
    if (users.find((u) => u.email === email)) {
      return { success: false, message: "Email already registered." };
    }
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("tw_users", JSON.stringify(users));
    const userData = { username, email };
    localStorage.setItem("tw_session", JSON.stringify(userData));
    setUser(userData);
    return { success: true, message: `Welcome, ${username}! Account created.` };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("tw_session");
    setUser(null);
  }, []);

  return { user, login, signup, logout };
}
