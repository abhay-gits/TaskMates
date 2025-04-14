import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import bg from "../assets/background.svg";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: AxiosResponse<{ token: string; message: string }> =
        await axios.post("/api/auth/login", formData);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
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
    <div className="h-screen flex items-center justify-center font-mono box-border">
      <div className="min-h-full w-full grid grid-cols-1 md:grid-cols-2 gap-y-0">
        {/* Left Hand Side */}
        <div className="flex flex-col items-center justify-center p-10 md:p-30">
          <h1 className="text-3xl font-bold mb-2 text-green-800">
            Tasks-Mates
          </h1>
          <p className="mb-5 text-center">
            Welcome back! Please enter your details.
          </p>
          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              value={formData.email}
              onChange={handleChange}
              name="email"
              required
              type="email"
              className="border border-green-400 rounded-md p-2 mb-4 w-full mt-2"
              placeholder="Enter your email"
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              className="border border-green-400 rounded-md p-2 mb-4 w-full mt-2"
              placeholder="**************"
              value={formData.password}
              onChange={handleChange}
            />
            <button className="bg-green-500 text-white rounded-md p-2 w-[80%] m-auto cursor-pointer hover:bg-green-600 transition duration-200">
              Sign In
            </button>
            <p className="text-center mt-4 text-sm md:text-base">
              Don't have an account?{" "}
              <a href="/signup" className="text-green-500">
                Sign Up
              </a>
            </p>
          </form>
        </div>
        {/* Right Hand Side */}
        <div className="h-50 md:h-full p-6 order-1 md:order-2">
          <div className="bg-gradient-to-br from-green-400 to-green-300 flex items-center justify-center rounded-2xl h-full">
            <img className="object-contain w-96 h-full" src={bg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
