
"use client";

import type { Task, QuadrantId, QuadrantInfo } from '@/types';
import { TaskCard } from './task-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import React from 'react';

interface QuadrantProps {
  quadrantInfo: QuadrantInfo;
  tasks: Task[];
  onDropTask: (quadrantId: QuadrantId) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStartTask: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  draggingTaskId: string | null;
  isOver: boolean;
}

export function Quadrant({
  quadrantInfo,
  tasks,
  onDropTask,
  onDragOver,
  onDragStartTask,
  onDeleteTask,
  onEditTask,
  draggingTaskId,
  isOver
}: QuadrantProps) {
  
  const baseBorder = quadrantInfo.color.replace('bg-', 'border-');

  return (
    <Card 
      className={`flex flex-col h-full transition-all duration-150 ease-in-out shadow-lg border-t-4 ${baseBorder} ${isOver ? 'bg-muted scale-[1.02]' : 'bg-card'}`}
      onDrop={() => onDropTask(quadrantInfo.id)}
      onDragOver={onDragOver}
    >
      <CardHeader className="p-1 md:p-2 border-b">
        <CardTitle className={`text-sm md:text-base font-bold ${quadrantInfo.color.replace('bg-', 'text-')}`}>{quadrantInfo.title}</CardTitle>
        <CardDescription className="text-xs hidden md:block">{quadrantInfo.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-1 md:p-2 flex-grow overflow-y-auto min-h-0">
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
            Drop tasks here or click '+' to add
          </div>
        )}
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            isDragging={draggingTaskId === task.id}
            onDragStart={onDragStartTask}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
          />
        ))}
      </CardContent>
    </Card>
  );
}
