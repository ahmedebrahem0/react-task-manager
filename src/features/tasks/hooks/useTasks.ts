import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addTask, editTask, deleteTask, toggleTask } from '../store/tasksSlice';
import { selectAllTasks, selectTaskStats } from '../store/selectors';
import type { Priority } from '../types';

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectAllTasks);
  const stats = useAppSelector(selectTaskStats);

  const handleAddTask = useCallback((title: string, priority: Priority) => {
    dispatch(addTask({ title, priority }));
  }, [dispatch]);

  const handleEditTask = useCallback((id: string, title: string, priority: Priority) => {
    dispatch(editTask({ id, title, priority }));
  }, [dispatch]);

  const handleDeleteTask = useCallback((id: string) => {
    dispatch(deleteTask(id));
  }, [dispatch]);

  const handleToggleTask = useCallback((id: string) => {
    dispatch(toggleTask(id));
  }, [dispatch]);

  return useMemo(() => ({
    tasks,
    stats,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleToggleTask,
  }), [tasks, stats, handleAddTask, handleEditTask, handleDeleteTask, handleToggleTask]);
};
