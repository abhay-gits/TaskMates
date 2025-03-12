import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FriendRequest {
  id: string;
  name: string;
  email: string;
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Friends</h1>
      <div className="mb-4">
        <h2 className="text-xl mb-2">Add a Friend</h2>
        <input
          type="email"
          value={newFriendEmail}
          onChange={(e) => setNewFriendEmail(e.target.value)}
          placeholder="Enter friend's email"
          className="border p-2 mr-2"
        />
        <button onClick={handleSearchFriend} className="bg-blue-500 text-white p-2 mr-2">Search</button>
        {searchResult && (
          <button onClick={handleAddFriend} className="bg-green-500 text-white p-2">Add Friend</button>
        )}
        {searchError && <p className="text-red-500">{searchError}</p>}
      </div>
      <div>
        <h2 className="text-xl mb-2">Friend Requests</h2>
        <ul>
          {friendRequests.map((request) => (
            <li key={request.id} className="border-b p-2">
              {request.name} ({request.email})
              <button>accept</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Friends; 