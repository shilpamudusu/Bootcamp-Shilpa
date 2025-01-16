import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";
import type { CreateTask } from "~/schemas/task";

const colors = {
  header: "bg-gradient-to-r from-teal-400 to-blue-500",
  button: "bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600",
  ring: "focus:ring-2 focus:ring-pink-300",
  border: "focus:border-indigo-500",
  card: "bg-gradient-to-r from-white via-gray-100 to-gray-50",
  cardHover: "hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out",
};

const Home: NextPage = () => {
  const [newTask, setNewTask] = useState<CreateTask>({
    title: "",
    description: undefined,
  });

  const [error, setError] = useState<string>("");

  const utils = api.useContext();

  const { data: tasks, isLoading: isTasksLoading } = api.task.getAll.useQuery();

  const createTask = api.task.create.useMutation({
    onSuccess: () => {
      setNewTask({ title: "", description: undefined });
      setError("");
      void utils.task.getAll.invalidate();
    },
    onError: (e) => {
      setError(e.message);
    },
  });

  const updateTask = api.task.update.useMutation({
    onSuccess: () => {
      setError("");
      void utils.task.getAll.invalidate();
    },
    onError: (e) => {
      setError(e.message);
    },
  });

  const deleteTask = api.task.delete.useMutation({
    onSuccess: () => void utils.task.getAll.invalidate(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    createTask.mutate(newTask);
  };

  if (isTasksLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );

  return (
    <>
      <Head>
        <title>Task Manager | T3 CRUD App</title>
        <meta name="description" content="Simple CRUD app with T3 Stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`sticky top-0 z-50 ${colors.header} py-6 shadow-lg`}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-white md:text-4xl">Task Manager</h1>
        </div>
      </header>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 rounded-xl bg-white p-8 shadow-2xl">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Add New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-100 p-4 text-sm text-red-600">{error}</div>
              )}
              <div className="flex flex-col gap-6 md:flex-row">
                <input
                  type="text"
                  placeholder="Task title"
                  className={`flex-1 rounded-md border border-gray-300 p-4 ${colors.border} outline-none focus:ring-2 ${colors.ring} transition-all`}
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  className={`flex-1 rounded-md border border-gray-300 p-4 ${colors.border} outline-none focus:ring-2 ${colors.ring} transition-all`}
                  value={newTask.description ?? ""}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      description: e.target.value || undefined,
                    })
                  }
                />
                <button
                  type="submit"
                  className={`whitespace-nowrap rounded-md ${colors.button} px-8 py-3 text-white shadow-md transition-all focus:outline-none focus:ring-2 ${colors.ring} disabled:cursor-not-allowed disabled:opacity-50`}
                  disabled={createTask.isPending}
                >
                  {createTask.isPending ? "Adding..." : "Add Task"}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            {tasks?.map((task) => (
              <div
                key={task.id}
                className={`transform rounded-xl p-8 ${colors.card} shadow-md transition-all hover:shadow-2xl ${colors.cardHover}`}
              >
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  <div className="flex-1">
                    <h3
                      className={`text-2xl font-semibold ${
                        task.completed ? "line-through text-gray-500" : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.description && <p className="mt-2 text-gray-600">{task.description}</p>}
                  </div>
                  <div className="flex flex-col gap-4 md:flex-row md:space-x-4">
                    <button
                      onClick={() => updateTask.mutate({ id: task.id, completed: !task.completed })}
                      className={`rounded-md px-6 py-3 text-sm font-medium text-white transition-colors ${
                        task.completed ? "bg-gray-600 hover:bg-gray-700" : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                    <button
                      onClick={() => deleteTask.mutate({ id: task.id })}
                      className="rounded-md bg-red-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 py-8 text-center text-white">
        <div className="container mx-auto px-6">
          <p>&copy; {new Date().getFullYear()} Task Manager. Built with T3 Stack.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
