import axios from "axios";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

function App() {
  const isLoginPage =
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup";
  return (
    <div>
      {!isLoginPage && (
        <>
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-16 flex items-center justify-center px-3">
            <h1 className="text-white text-2xl font-bold">TaskMates</h1>
          </div>
          <Navbar />
          <AppRoutes />;
        </>
      )}
    </div>
  );
}
export default App;
