"use client";

import type { Task } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2, Edit3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TaskCardProps {
  task: Task;
  isDragging: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, isDragging, onDragStart, onDelete, onEdit }: TaskCardProps) {
  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className={`mb-2 cursor-grab transition-all duration-150 ease-in-out shadow-md hover:shadow-lg ${isDragging ? 'opacity-50 scale-95 shadow-xl rotate-3' : 'opacity-100'}`}
    >
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold leading-tight mb-1">{task.title}</CardTitle>
          <GripVertical className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </div>
        {task.description && (
          <CardDescription className="text-xs text-muted-foreground line-clamp-2">{task.description}</CardDescription>
        )}
      </CardHeader>
      <CardFooter className="p-2 pt-0 flex justify-between items-center">
        <Badge variant="outline" className="text-xs">{new Date(task.createdAt).toLocaleDateString()}</Badge>
        <div>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(task)}>
            <Edit3 className="h-4 w-4" />
            <span className="sr-only">Edit Task</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => onDelete(task.id)}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete Task</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
