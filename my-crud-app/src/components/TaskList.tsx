import { trpc } from '~/utils/trpc';
import { useState } from 'react';

const TaskList = () => {
  const { data: tasks, refetch } = trpc.task.list.useQuery();
  const addTask = trpc.task.add.useMutation();
  const deleteTask = trpc.task.delete.useMutation();

  const [newTask, setNewTask] = useState('');

  const handleAddTask = async () => {
    if (newTask.trim() === '') return;
    await addTask.mutateAsync({ title: newTask });
    setNewTask('');
    refetch();
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask.mutateAsync({ id });
    refetch();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add Task
        </button>
      </div>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id} className="flex items-center justify-between">
            <span>{task.title}</span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="bg-red-500 text-white px-2 py-1"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
