import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import MyFriends from "../components/MyFriends";
import toast from "react-hot-toast";

interface FriendRequest {
  _id: string;
  username: string;
  email: string;
  profileImage?: string;
}

interface SearchResult {
  _id: string;
  username: string;
  email: string;
  profileImage?: string;
}

const Friends = () => {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [newFriendEmail, setNewFriendEmail] = useState<string>("");
  const [searchError, setSearchError] = useState<string | null>(null);

  const fetchFriendRequests = async () => {
    try {
      const { data } = await axios.get("/api/friend/requests");
      setFriendRequests(data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      toast.error(axiosError.response.data.message);
    } else {
      toast.error("An error occurred. Please try again.");
    }
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const handleSearchFriend = async () => {
    if (!newFriendEmail.trim()) {
      setSearchError("Please enter an email address");
      return;
    }
    try {
      const { data } = await axios.get(`/api/friend/search/${newFriendEmail}`);
      if (Array.isArray(data)) {
        setSearchResult(data[0]);
        setSearchError(null);
      } else {
        setSearchResult(null);
        setSearchError("User not found");
      }
      setSearchError(null);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
      setSearchResult(null);
      setSearchError("User not found");
    }
  };

  const handleAddFriend = async () => {
    if (!searchResult) return;
    try {
      await axios.put(`/api/friend/send-request/${searchResult.email}`);
      toast.success("Friend request sent!");
      setNewFriendEmail("");
      setSearchResult(null);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  /* Accept request */

  const acceptRequest = async (id: string) => {
    const requesterId = id;
    console.log("Requester ID:", requesterId); // Log the requester ID
    try {
      await axios.put(`/api/friend/accept-request/${requesterId}`);
      toast.success("Friend request accepted!");
      fetchFriendRequests();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  /* Decline request */

  const rejectRequest = async (id: string) => {
    try {
      const {data} = await axios.put(`/api/friend/reject-request/${id}`);
      console.log("Response data:"); // Log the response data
      toast.success("Friend request rejected!");
    } catch (error) {
      console.log("Error:", error); 
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Friends</h1>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Find Friends
        </h2>
        <div className="flex gap-1 md:gap-2">
          <input
            type="email"
            value={newFriendEmail}
            onChange={(e) => setNewFriendEmail(e.target.value)}
            placeholder="Enter friend's email"
            className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearchFriend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-6 py-2 rounded-md transition duration-200"
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
                {searchResult.profileImage ? (
                  <img
                    src={searchResult.profileImage}
                    alt={searchResult.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xl">
                    {searchResult.username}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {searchResult.username}
                </h3>
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
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Friend Requests
        </h2>
        {friendRequests.length === 0 ? (
          <p className="text-gray-500">No pending friend requests</p>
        ) : (
          <ul className="space-y-4">
            {friendRequests.map((request) => (
              <li
                key={request._id}
                className="sm:flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src={request.profileImage}
                      alt={request.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {request.username}
                    </h3>
                    <p className="text-sm text-gray-600">{request.email}</p>
                  </div>
                </div>
                <div className="flex gap-5 mt-4 md:mt-0">
                  <button
                    onClick={() => acceptRequest(request._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => rejectRequest(request._id)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition duration-200"
                  >
                    Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {<MyFriends />}
    </div>
  );
};

export default Friends;
