import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
  _id: string;
  username: string;
  email: string;
  profileImage: string;
}

interface AuthContextType {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const { data } = await axios.get("/api/user");      
      setAuthUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setAuthUser(null);
    }}
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
