import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import * as TaskActions from './task.actions';

export interface TaskState {
  tasks: Task[];
  currentUser: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  currentUser: null
};

export const taskReducer = createReducer(
  initialState,
  
  // Login
  on(TaskActions.login, (state, { email }) => ({
    ...state,
    currentUser: email
  })),
  
  // Logout
  on(TaskActions.logout, (state) => ({
    ...state,
    tasks: [],
    currentUser: null
  })),
  
  // Add Task
  on(TaskActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, { ...task, id: Date.now() }]
  })),
  
  // Update Task
  on(TaskActions.updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => t.id === task.id ? task : t)
  })),
  
  // Delete Task
  on(TaskActions.deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== id)
  })),
  
  // Toggle Task
  on(TaskActions.toggleTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    )
  }))
);