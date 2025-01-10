"use client";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Trash2, Plus, Loader2 } from 'lucide-react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function Home() {
  const utils = api.useContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const tasks = api.task.list.useQuery();
  const addTask = api.task.add.useMutation({
    onSuccess: () => {
      reset();
      void utils.task.list.invalidate();
      toast.success("Task added successfully!");
    },
    onError: () => {
      toast.error("Failed to add task. Please try again.");
    },
  });
  const deleteTask = api.task.delete.useMutation({
    onSuccess: () => {
      void utils.task.list.invalidate();
      toast.success("Task deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete task. Please try again.");
    },
  });

  const onSubmit = (data: TaskFormData) => {
    addTask.mutate(data);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Toaster position="top-right" />
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-center mb-12 sm:text-[5rem]">
          Task Manager
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Add New Task</CardTitle>
              <CardDescription>Enter a title for your new task</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    {...register("title")}
                    placeholder="Enter task title"
                    className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  disabled={addTask.isLoading}
                  className="w-full"
                >
                  {addTask.isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Task
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Tasks</CardTitle>
              <CardDescription>Manage your current tasks</CardDescription>
            </CardHeader>
            <CardContent>
              {tasks.isLoading ? (
                <div className="flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : tasks.data && tasks.data.length > 0 ? (
                <ul className="space-y-4">
                  {tasks.data.map((task) => (
                    <li key={task.id} className="flex items-center justify-between bg-white/20 p-4 rounded-lg">
                      <span className="text-lg">{task.title}</span>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteTask.mutate({ id: task.id })}
                        disabled={deleteTask.isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-white/50">No tasks yet. Add one to get started!</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

