import axios from "axios"
import { useEffect, useState } from "react"


const FriendsTasks = () => {
    const [tasks, setTasks] = useState<any>([]);
    useEffect(()=>{
        const fetchTasks = async ()=>{
            const data = await axios.get("/task/friends-tasks")
            setTasks(data.data)
        }
        fetchTasks();
    },[])
    console.log("Friend Tasks:::",tasks);
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Friends & Their Tasks</h2>
      <div className="space-y-4">
        {tasks.map((friend:any) => (
          <div key={friend._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <img
                src={friend.profilePic || `https://robohash.org/${friend._id}?size=50x50`}
                alt={friend.name}
                className="w-12 h-12 rounded-full"
                onError={(e) => (e.currentTarget.src = `https://robohash.org/${friend._id}?size=50x50`)}
              />
              <div>
                <h3 className="text-lg font-semibold">{friend.name}</h3>
                <p className="text-gray-500">{friend.email}</p>
              </div>
            </div>
            <div className="mt-3">
              <h4 className="font-semibold text-gray-700">Tasks:</h4>
              {friend.tasks.length > 0 ? (
                <ul className="mt-2 space-y-1">
                  {friend.tasks.map((task:any) => (
                    <li
                      key={task._id}
                      className={`p-2 rounded-md ${
                        task.status ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {task.title} 
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mt-2">No Tasks...</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FriendsTasks