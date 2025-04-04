import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const FriendsTasks = () => {
  const [tasks, setTasks] = useState<any>([]);

  const fetchTasks = async (message?: string) => {
    if(message){
      toast.success("Tasks Refreshed");
    }
    const {data} = await axios.get("/api/task/friends-tasks");
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex gap-5 items-center mb-4">
      <h2 className="text-2xl font-bold ">Friends Tasks</h2>
      <svg onClick={()=>fetchTasks("refresh")} className="cursor-pointer"
       width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div className="space-y-4">
        {tasks
        .filter((friend: any) => friend.tasks.length > 0)
        .map((friend: any) => (
          <div key={friend._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <img
                src={friend.profileImage}
                alt={friend.username}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{friend.username}</h3>
                <p className="text-gray-500">{friend.email}</p>
              </div>
            </div>
            <div className="mt-3">
              <h4 className="font-semibold text-gray-700">Tasks:</h4>
              
                <ul className="mt-2 space-y-1">
                  {friend.tasks.map((task: any) => (
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
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsTasks;
