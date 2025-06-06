export type QuadrantId =
  | 'urgent-and-important' // Do
  | 'not-urgent-and-important' // Schedule
  | 'urgent-and-not-important' // Delegate
  | 'not-urgent-and-not-important'; // Eliminate

export interface Task {
  id: string;
  title: string;
  description?: string;
  quadrant: QuadrantId;
  createdAt: number;
}

export interface QuadrantInfo {
  id: QuadrantId;
  title: string;
  color: string; // Tailwind color class, e.g., 'bg-red-500'
  description: string;
}

export type UserRole = 'guest' | 'authenticated' | 'subscribed';

export interface UserProfile {
  uid?: string;
  email?: string | null;
  displayName?: string | null;
  role: UserRole;
}
