import { useState } from "react";
import { api } from "../utils/api";  // Import tRPC hooks

export default function Tasks() {
  const { data: tasks, refetch } = api.task.list.useQuery();
  const addTask = api.task.add.useMutation({
    onSuccess: () => refetch(),
  });
  const deleteTask = api.task.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const [title, setTitle] = useState("");

  const handleAddTask = () => {
    if (!title.trim()) return; // Ensure title is not empty
    addTask.mutate({ title });
    setTitle(""); // Clear input field
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <div className="mt-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border px-3 py-2 rounded-md mr-2"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Task
        </button>
      </div>
      <ul className="mt-6">
        {tasks?.map((task) => (
          <li key={task.id} className="flex justify-between items-center mb-2">
            <span>{task.title}</span>
            <button
              onClick={() => deleteTask.mutate({ id: task.id })}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
