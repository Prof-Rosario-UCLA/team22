import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";

export type StorageType = "localStorage" | "sessionStorage";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
  loading: boolean;
  login: (token: string, userId: string, storageType: StorageType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const localToken = localStorage.getItem("authToken");
    const localUserId = localStorage.getItem("userId");
    const sessionToken = sessionStorage.getItem("authToken");
    const sessionUserId = sessionStorage.getItem("userId");

    const finalToken = localToken || sessionToken;
    const finalUserId = localUserId || sessionUserId;

    if (finalToken && finalUserId) {
      setToken(finalToken);
      setUserId(finalUserId);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = (newToken: string, newUserId: string, storageType: StorageType) => {
    const storage = storageType === "localStorage" ? localStorage : sessionStorage;

    storage.setItem("authToken", newToken);
    storage.setItem("userId", newUserId);

    setToken(newToken);
    setUserId(newUserId);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId");

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
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

