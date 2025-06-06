"use client";

import type { Task, QuadrantId } from '@/types';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/auth/auth-provider';
import { useToast } from '@/hooks/use-toast';

const LOCAL_STORAGE_KEY = 'supertasks-tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, taskLimit } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks from local storage", error);
      toast({ title: "Error", description: "Could not load tasks.", variant: "destructive" });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) { // Only save when not initially loading
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks to local storage", error);
        toast({ title: "Error", description: "Could not save tasks.", variant: "destructive" });
      }
    }
  }, [tasks, isLoading, toast]);

  const addTask = useCallback((newTaskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (tasks.length >= taskLimit) {
      toast({
        title: "Task limit reached",
        description: `You can only have ${taskLimit} tasks. Please upgrade or remove existing tasks.`,
        variant: "destructive",
      });
      return false;
    }
    const newTask: Task = {
      ...newTaskData,
      id: Date.now().toString(), // Simple ID generation
      createdAt: Date.now(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    return true;
  }, [tasks.length, taskLimit, toast]);

  const updateTaskQuadrant = useCallback((taskId: string, newQuadrant: QuadrantId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, quadrant: newQuadrant } : task
      )
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);
  
  const updateTask = useCallback((updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);


  return {
    tasks,
    isLoading,
    addTask,
    updateTaskQuadrant,
    deleteTask,
    updateTask,
    getTasksByQuadrant: (quadrantId: QuadrantId) => tasks.filter(task => task.quadrant === quadrantId),
  };
}
