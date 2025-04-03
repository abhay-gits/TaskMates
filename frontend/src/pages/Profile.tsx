import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setAuthUser(null);
      window.location.href = "/login";
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {authUser?.username}!
      </h1>
      <img
        src={authUser?.profileImage}
        alt="Profile"
        className="w-12 h-12 rounded-full mb-4"
      />
      <p className="mb-4">Email: {authUser?.email}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
