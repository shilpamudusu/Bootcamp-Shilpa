"use client";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Trash2 } from 'lucide-react';

export default function TaskList() {
  const { data: tasks, refetch } = api.task.list.useQuery();
  const deleteMutation = api.task.delete.useMutation({
    onSuccess: () => refetch(),
  });

  if (!tasks) return <div>Loading...</div>;

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between rounded-lg bg-white p-4 shadow"
        >
          <span>{task.title}</span>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => deleteMutation.mutate({ id: task.id })}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </li>
      ))}
    </ul>
  );
}

