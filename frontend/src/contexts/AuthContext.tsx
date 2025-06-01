import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
  loading: boolean;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // 2. Add isLoading state, initialize to true
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // 3. Use useEffect to check initial auth status (e.g., from localStorage)
  useEffect(() => {
    // This effect runs once on mount
    const storedToken =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    const storedUserId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = (newToken: string, newUserId: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", newToken);
      localStorage.setItem("userId", newUserId);
    }
    setToken(newToken);
    setUserId(newUserId);
    setIsAuthenticated(true);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
    }
    setToken(null);
    setUserId(null);
    setIsAuthenticated(false);
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    token,
    userId,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
