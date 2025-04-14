import React, { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Link } from "react-router-dom";
import bg from "../assets/background.svg";
import toast from "react-hot-toast";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
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
        await axios.post("/api/auth/register", formData);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        toast.success("Signup successful! Redirecting...");
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
    <div className="h-screen flex items-center justify-center p-7 font-mono ">
      <div className="rounded-2xl md:h-full w-full flex justify-center md:grid grid-cols-2 overflow-hidden">
        <div className=" flex flex-col items-center justify-center p-10 ">
          <h1 className="text-3xl font-bold mb-2">Tasks-Mates</h1>
          <p className="mb-5 text-center">
            Enter your details to create an account.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="border border-gray-400 rounded-md p-2 mb-4 w-full mt-2"
              required
            />
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="border border-gray-400 rounded-md p-2 mb-4 w-full mt-2"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="border border-gray-400 rounded-md p-2 mb-4 w-full mt-2"
              placeholder="**************"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="bg-red-500 text-white rounded p-2">
              Sign Up
            </button>
            <p className="text-center mt-4 text-sm md:text-base">
              Already have an account?{" "}
              <a href="/signup" className="text-blue-500 block md:inline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
        <div className="bg-gradient-to-br from-red-400 to-red-300 hidden md:flex items-center justify-center rounded-2xl ">
          <img className="w-96 bg-contain" src={bg} />
        </div>
      </div>
    </div>
  );
};

export default Signup;

//-----
