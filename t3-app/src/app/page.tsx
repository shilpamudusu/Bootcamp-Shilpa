import TaskList from "~/components/TaskList";
import AddTaskForm from "~/components/AddTaskForm";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Task Manager</h1>
      <AddTaskForm />
      <TaskList />
    </main>
  );
}

