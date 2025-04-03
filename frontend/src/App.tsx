import axios from "axios";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import icon from "./assets/icon.svg";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

function App() {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      {!isLoginPage && (
        <>
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-16 flex items-center gap-7 px-3">
            <img src={icon} width={35} />
            <h1 className="text-white text-2xl font-bold">TaskMates</h1>
          </div>
          <Navbar />
        </>
      )}
      <AppRoutes />
    </div>
  );
}
export default App;
