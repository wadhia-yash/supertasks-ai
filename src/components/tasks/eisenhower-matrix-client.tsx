"use client";

import type { QuadrantId, QuadrantInfo, Task } from '@/types';
import { Quadrant } from './quadrant';
import { AddTaskDialog } from './add-task-dialog';
import { useTasks } from '@/hooks/use-tasks';
import { useState, useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const quadrantInfos: QuadrantInfo[] = [
  { id: 'urgent-and-important', title: 'Urgent & Important', description: 'Tasks to do first.', color: 'bg-red-500' },
  { id: 'not-urgent-and-important', title: 'Not Urgent & Important', description: 'Tasks to schedule.', color: 'bg-blue-500' },
  { id: 'urgent-and-not-important', title: 'Urgent & Not Important', description: 'Tasks to delegate.', color: 'bg-yellow-500' },
  { id: 'not-urgent-and-not-important', title: 'Not Urgent & Not Important', description: 'Tasks to eliminate.', color: 'bg-green-500' },
];

export function EisenhowerMatrixClient() {
  const { tasks, isLoading, addTask, updateTaskQuadrant, deleteTask, updateTask, getTasksByQuadrant } = useTasks();
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [dragOverQuadrant, setDragOverQuadrant] = useState<QuadrantId | null>(null);
  
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);


  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
    setDraggingTaskId(taskId);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>, quadrantId: QuadrantId) => {
    e.preventDefault();
    setDragOverQuadrant(quadrantId);
  }, []);
  
  const handleDragLeaveQuadrant = useCallback(() => {
    setDragOverQuadrant(null);
  }, []);

  const handleDrop = useCallback((quadrantId: QuadrantId) => {
    if (draggingTaskId) {
      updateTaskQuadrant(draggingTaskId, quadrantId);
    }
    setDraggingTaskId(null);
    setDragOverQuadrant(null);
  }, [draggingTaskId, updateTaskQuadrant]);

  const handleDeleteTask = useCallback((taskId: string) => {
    deleteTask(taskId);
  }, [deleteTask]);
  
  const handleOpenEditDialog = (task: Task) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  const handleEditTask = (updatedTaskData: Task) => {
    updateTask(updatedTaskData);
    setIsEditDialogOpen(false);
    setEditingTask(null);
  };


  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 relative h-[calc(100vh-3.5rem)]">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-full w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 w-full h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] min-h-0"
        style={{ minHeight: 0 }}
      >
        {quadrantInfos.map(qInfo => (
          <div key={qInfo.id} onDragLeave={handleDragLeaveQuadrant} className="h-full min-h-0">
            <Quadrant
              quadrantInfo={qInfo}
              tasks={getTasksByQuadrant(qInfo.id)}
              onDropTask={() => handleDrop(qInfo.id)}
              onDragOver={(e) => handleDragOver(e, qInfo.id)}
              onDragStartTask={handleDragStart}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleOpenEditDialog}
              draggingTaskId={draggingTaskId}
              isOver={dragOverQuadrant === qInfo.id}
            />
          </div>
        ))}
        {/* Central Add Button - For Desktop, use absolute positioning. For Mobile, it's part of AddTaskDialog */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <AddTaskDialog 
            onAddTask={addTask} 
            triggerButton={
              <Button 
                variant="default" 
                size="lg" 
                className="rounded-full p-4 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground aspect-square h-20 w-20"
                aria-label="Add new task"
              >
                <PlusCircle className="h-10 w-10" />
              </Button>
            }
          />
        </div>
      </div>
      {/* Floating Add Button for Mobile - Rendered by AddTaskDialog itself */}
       <div className="md:hidden fixed bottom-6 right-6 z-50">
         <AddTaskDialog onAddTask={addTask} />
       </div>

      {/* Edit Task Dialog */}
      {editingTask && (
        <AddTaskDialog
          isEditMode
          initialTaskData={editingTask}
          onEditTask={handleEditTask}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          triggerButton={<span />} 
        />
      )}
    </div>
  );
}

