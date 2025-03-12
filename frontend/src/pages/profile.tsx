import React from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  profilePic: string;
}

interface HomeProps {
  user: User;
}

const Profile: React.FC<HomeProps> = ({ user }) => {
  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
      <img src={user.profilePic} alt="Profile" className="w-12 h-12 rounded-full mb-4" />
      <p className="mb-4">Email: {user.email}</p>
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