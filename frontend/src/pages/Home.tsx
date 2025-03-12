import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
}

interface HomeProps {
  user: User;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get('/task', { params: { userId: user._id } });
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [user._id]);

  const handleAddTask = async () => {
    try {
      console.log(newTaskTitle, );
      
      const { data } = await axios.post('/task', { title: newTaskTitle, userId: user._id });
      setTasks([...tasks, { id: data.id, title: newTaskTitle, completed: false }]);
      setNewTaskTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <div className="mb-4">
        <h2 className="text-xl mb-2">Add a Task</h2>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter task title"
          className="border p-2 mr-2"
        />
        <button onClick={handleAddTask} className="bg-blue-500 text-white p-2">Add Task</button>
      </div>
      <div>
        <h2 className="text-xl mb-2">Your Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="border-b p-2">
              {task.title} {task.completed ? '(Completed)' : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;