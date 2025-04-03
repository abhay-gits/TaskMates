import { useEffect, useState } from "react";
import axios from "axios";

const FriendsTasks = () => {
  const [tasks, setTasks] = useState<any>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const {data} = await axios.get("/api/task/friends-tasks");
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Friends Tasks</h2>
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
