import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';


export const login = createAction(
  '[Login] Login User',
  props<{ email: string }>()
);

export const logout = createAction(
  '[Header] Logout User'
);


export const addTask = createAction(
  '[Task Form] Add Task',
  props<{ task: Task }>()
);

export const updateTask = createAction(
  '[Task List] Update Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Task List] Delete Task',
  props<{ id: number }>()
);

export const toggleTask = createAction(
  '[Task List] Toggle Task',
  props<{ id: number }>()
);