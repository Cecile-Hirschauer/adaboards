// Type definitions for Adaboards

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Board {
  id: string;
  name: string;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  boardId: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}
