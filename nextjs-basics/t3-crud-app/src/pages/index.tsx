import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";
import type { CreateTask } from "~/schemas/task";

const colors = {
  header: "bg-gradient-to-r from-sky-400 to-teal-400",
  button: "bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500",
  ring: "focus:ring-2 focus:ring-cyan-200",
  border: "focus:border-cyan-400",
  card: "bg-white backdrop-blur-lg bg-opacity-70",
  cardHover: "hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 ease-in-out",
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
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-cyan-50">
        <div className="text-2xl font-semibold text-sky-600">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50">
      <Head>
        <title>Todo List | T3 CRUD App</title>
        <meta name="description" content="Simple CRUD app with T3 Stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`${colors.header} py-6`}>
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Todo List</h1>
          <p className="mt-2 text-sky-50">Stay organized, stay productive</p>
        </div>
      </header>

      <main className="px-4 py-8 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar with Form */}
            <div className="lg:w-1/3">
              <div className="sticky top-8 rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">Add New Todo</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
                  )}
                  <div>
                    <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-600">
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      placeholder="What needs to be done?"
                      className={`w-full rounded-lg border border-gray-200 p-3 ${colors.border} outline-none ${colors.ring}`}
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-gray-600">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      placeholder="Add more details..."
                      className={`w-full rounded-lg border border-gray-200 p-3 ${colors.border} outline-none ${colors.ring}`}
                      value={newTask.description ?? ""}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          description: e.target.value || undefined,
                        })
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full rounded-lg ${colors.button} py-3 font-medium text-white shadow-md transition-all disabled:cursor-not-allowed disabled:opacity-50`}
                    disabled={createTask.isPending}
                  >
                    {createTask.isPending ? "Adding..." : "Add Todo"}
                  </button>
                </form>
              </div>
            </div>

            {/* Main Content - Tasks Grid */}
            <div className="lg:w-2/3">
              <div className="grid gap-4">
                {tasks?.map((task) => (
                  <div
                    key={task.id}
                    className={`rounded-xl ${colors.card} p-5 shadow-md ${colors.cardHover}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3
                            className={`text-lg font-medium ${
                              task.completed ? "text-gray-400" : "text-gray-700"
                            }`}
                          >
                            {task.title}
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                              task.completed
                                ? "bg-teal-100 text-teal-700"
                                : "bg-sky-100 text-sky-700"
                            }`}
                          >
                            {task.completed ? "Done" : "In Progress"}
                          </span>
                        </div>
                        {task.description && (
                          <p className="mt-2 text-sm text-gray-600">{task.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateTask.mutate({ id: task.id, completed: !task.completed })}
                          className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${
                            task.completed
                              ? "bg-gray-400 hover:bg-gray-500"
                              : "bg-teal-400 hover:bg-teal-500"
                          }`}
                        >
                          {task.completed ? "Undo" : "Complete"}
                        </button>
                        <button
                          onClick={() => deleteTask.mutate({ id: task.id })}
                          className="rounded-lg bg-red-400 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 bg-gradient-to-r from-sky-400 to-teal-400 py-6 text-center text-white">
        <div className="container mx-auto px-6">
          <p>&copy; {new Date().getFullYear()} Todo List app. Built with T3 Stack.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;