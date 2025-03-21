import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyFriends from '../components/MyFriends';

interface FriendRequest {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
}

const Friends: React.FC = () => {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [newFriendEmail, setNewFriendEmail] = useState<string>('');
  const [searchResult, setSearchResult] = useState<FriendRequest | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const { data } = await axios.get('/friend/requests');
        console.log("Friend Requests:", data);
        setFriendRequests(data);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };
    fetchFriendRequests();
  }, []);

  const handleSearchFriend = async () => {
    if (!newFriendEmail.trim()) {
      setSearchError('Please enter an email address');
      return;
    }
    try {
      const { data } = await axios.get(`/friend/search/${newFriendEmail}`);
      setSearchResult(data);
      setSearchError(null);
    } catch (error) {
      console.error('Error searching for friend:', error);
      setSearchResult(null);
      setSearchError('User not found');
    }
  };

  const handleAddFriend = async () => {
    if (!searchResult) return;
    try {
      await axios.put(`friend/send-request/${searchResult.email}`);
      setNewFriendEmail('');
      setSearchResult(null);
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  /* Accept request */

  const acceptRequest = async(id: string)=>{
    console.log("accept Request clicker");
    console.log(id);
    
    await axios.post('friend/accept-request',{requesterId: id});
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Friends</h1>
      
      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Find Friends</h2>
        <div className="flex gap-2">
          <input
            type="email"
            value={newFriendEmail}
            onChange={(e) => setNewFriendEmail(e.target.value)}
            placeholder="Enter friend's email"
            className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSearchFriend} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-200"
          >
            Search
          </button>
        </div>
        {searchError && (
          <p className="mt-2 text-red-500 text-sm">{searchError}</p>
        )}

        {/* Search Result Profile Card */}
        {searchResult && (
          <div className="mt-6 border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                {searchResult.profilePic ? (
                  <img 
                    src={searchResult.profilePic} 
                    alt={searchResult.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xl">
                    {searchResult.name[0].toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{searchResult.name}</h3>
                <p className="text-gray-600">{searchResult.email}</p>
              </div>
              <button 
                onClick={handleAddFriend} 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
              >
                Add Friend
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Friend Requests Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Friend Requests</h2>
        {friendRequests.length === 0 ? (
          <p className="text-gray-500">No pending friend requests</p>
        ) : (
          <ul className="space-y-4">
            {friendRequests.map((request) => (
              <li key={request._id} className="sm:flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    {request.profilePic ? (
                      <img 
                        src={request.profilePic} 
                        alt={request.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white">
                        {request.name[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{request.name}</h3>
                    <p className="text-sm text-gray-600">{request.email}</p>
                  </div>
                </div>
                <div className="flex gap-5 mt-4 md:mt-0">
                  
                  <button 
                  onClick={()=> acceptRequest(request._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200">
                    Accept
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition duration-200">
                    Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* -------- */}
      <MyFriends/>
    </div>
  );
};

export default Friends; 