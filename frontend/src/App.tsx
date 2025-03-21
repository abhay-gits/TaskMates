import { useEffect, useState } from "react";
import axios from "axios";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

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

  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/user");
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

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
      <AppRoutes user={user} />
    </div>
  );
}

export default App;
