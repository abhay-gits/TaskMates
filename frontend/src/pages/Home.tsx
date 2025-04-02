import { useState, useEffect } from "react";
import axios from "axios";
import FriendsTasks from "../components/FriendsTasks";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

const Home=() => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("/api/task");
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTaskTitle.trim() === "") return;

    try {
      await axios.post("/api/task", { title: newTaskTitle });
      setNewTaskTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id: string)=>{
    try {
      await axios.delete(`/api/task/${id}`)
      console.log("task deleted")
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {/* Add Task Section */}
        <div className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={50}
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-200"
            >
              Add
            </button>
          </div>
        </div>

        {/* Tasks List Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Your Tasks
          </h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No tasks yet. Add one above!
            </p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li onClick={()=>deleteTask(task._id)}
                  key={task._id}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition duration-200 group"
                >
                  <button className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      color="#000000"
                      fill="none"
                    >
                      <path
                        d="M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 11.3333C9 11.3333 9.875 11.3333 10.75 13C10.75 13 13.5294 8.83333 16 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <span className="flex-1 text-gray-700">{task.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <FriendsTasks/>
    </div>
  );
};

export default Home;
