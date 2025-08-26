import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LS_KEY = "auth:user";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: (_user, _remember) => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const login = (userData, remember = true) => {
    setUser(userData);
    if (remember) {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(userData));
      } catch {
        /* ignore */
      }
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(LS_KEY);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo(
    () => ({
      isAuthenticated: !!user,
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
