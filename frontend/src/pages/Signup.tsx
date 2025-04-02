import React, { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: AxiosResponse<{ token: string; message: string}> = await axios.post("/api/auth/register", formData);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      } else {
        alert("Signup failed. Please try again.");
      } 
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response) {
        alert(axiosError.response.data.message); // Display the error message from the server
      } else {
        alert("An error occurred. Please try again.");
      }

    }
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
        </form>
        <Link to='/login' className="mt-4">
          Already have an account?{" "}
          <span className="text-blue-500 hover:underline">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
