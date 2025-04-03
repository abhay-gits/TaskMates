import { createContext, useState, useEffect, ReactNode } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

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
    if (!token) {
      setAuthUser(null);
      return;
    }
    try {
      const { data } = await axios.get("/api/user");      
      setAuthUser(data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
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
