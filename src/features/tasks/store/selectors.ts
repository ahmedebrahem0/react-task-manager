import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/store';
import type { FilterValue, Task, TasksState } from '../types';

const selectTasksState = (state: RootState): TasksState => state.tasks;

export const selectAllTasks = createSelector(
  selectTasksState,
  (tasksState): Task[] => tasksState.tasks
);

export const selectFilter = createSelector(
  selectTasksState,
  (tasksState): FilterValue => tasksState.filter
);

export const selectFilteredTasks = createSelector(
  selectAllTasks,
  selectFilter,
  (tasks, filter): Task[] => {
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
