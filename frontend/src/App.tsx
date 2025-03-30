import { useEffect, useState } from "react";
import axios from "axios";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

// Configure axios defaults
axios.defaults.baseURL = "https://taskmates-8wmg.onrender.com";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

// Add response interceptor for handling auth errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface User {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('Fetching user...');
        const { data } = await axios.get("/api/user");
        console.log("User data received:", data);
        setUser(data);
        
        if (isLoginPage && data) {
          navigate('/');
        }
      } catch (error: any) {
        console.error("Error fetching user:", error.response?.data || error.message);
        setUser(null);
        if (!isLoginPage && error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isLoginPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      {!isLoginPage && (
        <>
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-16 flex items-center justify-center px-3">
            <h1 className="text-white text-2xl font-bold">TaskMates</h1>
          </div>
          <Navbar />
        </>
      )}
      <AppRoutes user={user} loading={loading} />
    </div>
  );
}

export default App;
