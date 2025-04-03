import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyFriends = () => {
  const [friends, setFriends] = useState<any>([]);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const { data } = await axios.get("/api/friend");
        setFriends(data);
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response?.data?.message) {
          toast.error(axiosError.response.data.message);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    };
    fetchFriends();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-5">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">My Friends</h2>
      {friends.length == 0 ? (
        <p className="text-gray-500">You dont have friends, Sad :)</p>
      ) : (
        <ul>
          {friends.map((friend: any) => (
            <li
              key={friend._id}
              className="sm:flex items-center justify-between border-b pb-4 mb-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={friend.profileImage}
                    alt={friend.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {friend.username}
                  </h3>
                  <p className="text-sm text-gray-600">{friend.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyFriends;
