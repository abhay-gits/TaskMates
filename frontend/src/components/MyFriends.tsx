import axios from 'axios';
import { useEffect, useState } from 'react';

const MyFriends = () => {
    const [friends, setFriends] = useState<any>([]);
    useEffect(() => {
        const fetchFriends = async () => {
          try {
            const { data } = await axios.get('/friend/friends');
            console.log("Friends ::::", data);
            setFriends(data);
          } catch (error) {
            console.error('Error fetching friend friends:', error);
          }
        };
        fetchFriends();
      }, []);

  return (
    <div className='bg-white rounded-lg shadow-md p-6 mt-5'>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">My Friends</h2>
        {friends.length == 0?(
          <p className="text-gray-500">You dont have friends, Sad :)</p>
        ) :(

            <ul>
        {friends.map((friend: any)=>(
            /* ------ */
            <li key={friend._id} className="sm:flex items-center justify-between border-b pb-4 mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    {friend.profilePic ? (
                        <img 
                        src={friend.profilePic || `https://robohash.org/${friend._id}?size=50x50`} 
                        alt={friend.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.src = `https://robohash.org/${friend._id}?size=50x50`)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white">
                        {friend.name[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{friend.name}</h3>
                    <p className="text-sm text-gray-600">{friend.email}</p>
                  </div>
                </div>
              </li>
            /* ------ */
        ))}
        </ul>
    )}
    </div>
  )
}

export default MyFriends