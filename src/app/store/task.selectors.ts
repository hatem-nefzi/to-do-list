import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectCurrentUser = createSelector(
  selectTaskState,
  (state) => state.currentUser
);

export const selectAllTasks = createSelector(
  selectTaskState,
  (state) => state.tasks
);

export const selectActiveTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(t => !t.completed)
);

export const selectCompletedTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(t => t.completed)
);

export const selectTaskById = (id: number) => createSelector(
  selectAllTasks,
  (tasks) => tasks.find(t => t.id === id)
);