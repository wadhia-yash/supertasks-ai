
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddTaskForm } from "./add-task-form";
import type { Task } from "@/types";
import { PlusCircle, Edit } from "lucide-react";

interface AddTaskDialogProps {
  onAddTask: (taskData: Omit<Task, 'id' | 'createdAt'>) => boolean;
  onEditTask?: (taskData: Task) => void;
  triggerButton?: React.ReactNode;
  initialTaskData?: Task;
  isEditMode?: boolean;
  open?: boolean; // Prop to control dialog visibility externally
  onOpenChange?: (isOpen: boolean) => void; // Callback for when dialog requests a visibility change
}

export function AddTaskDialog({
  onAddTask,
  onEditTask,
  triggerButton,
  initialTaskData,
  isEditMode = false,
  open: openProp,
  onOpenChange: onOpenChangeProp,
}: AddTaskDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = openProp !== undefined;
  const currentOpenState = isControlled ? openProp : internalOpen;

  const handleOpenChange = (newOpenState: boolean) => {
    if (isControlled && onOpenChangeProp) {
      onOpenChangeProp(newOpenState);
    } else if (!isControlled) {
      setInternalOpen(newOpenState);
    }
  };

  const handleSubmit = (values: Omit<Task, 'id' | 'createdAt'>) => {
    let success = false;
    if (isEditMode && onEditTask && initialTaskData) {
      onEditTask({ ...initialTaskData, ...values });
      success = true;
    } else {
      success = onAddTask(values);
    }
    if (success) {
      handleOpenChange(false); // Close dialog using the unified handler
    }
  };
  
  const defaultTrigger = isEditMode ? (
    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleOpenChange(true)}>
      <Edit className="h-4 w-4" />
      <span className="sr-only">Edit Task</span>
    </Button>
  ) : (
    <Button 
      variant="default" 
      size="lg" 
      className="fixed bottom-6 right-6 md:static rounded-full md:rounded-md p-4 md:p-2 shadow-lg md:shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground"
      onClick={() => handleOpenChange(true)}
      aria-label="Add new task"
    >
      <PlusCircle className="h-6 w-6 md:mr-2" />
      <span className="hidden md:inline">Add Task</span>
    </Button>
  );

  return (
    <Dialog open={currentOpenState} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {triggerButton ? React.cloneElement(triggerButton as React.ReactElement, { onClick: () => handleOpenChange(true) }) : defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Task' : 'Add New Task'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Update the details of your task.' : 'Enter the details of your new task. You can use AI to help suggest its placement.'}
          </DialogDescription>
        </DialogHeader>
        <AddTaskForm onSubmit={handleSubmit} initialData={initialTaskData} isEditMode={isEditMode} />
      </DialogContent>
    </Dialog>
  );
}
