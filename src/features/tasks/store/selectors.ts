import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/store';

const selectTasksState = (state: RootState) => state.tasks;

export const selectAllTasks = createSelector(
  selectTasksState,
  (tasksState) => tasksState.tasks
);

export const selectFilter = createSelector(
  selectTasksState,
  (tasksState) => tasksState.filter
);

export const selectFilteredTasks = createSelector(
  selectAllTasks,
  selectFilter,
  (tasks, filter) => {
    if (filter === 'All') return tasks;
    return tasks.filter(task => task.priority === filter);
  }
);

export const selectTaskStats = createSelector(
  selectAllTasks,
  (tasks) => ({
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
  })
);