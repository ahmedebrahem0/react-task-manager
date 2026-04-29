import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addTask, editTask, deleteTask, toggleTask } from '../store/tasksSlice';
import { selectAllTasks, selectTaskStats } from '../store/selectors';
import type { Priority } from '../types';

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectAllTasks);
  const stats = useAppSelector(selectTaskStats);

  const handleAddTask = (title: string, priority: Priority) => {
    dispatch(addTask({ title, priority }));
  };

  const handleEditTask = (id: string, title: string, priority: Priority) => {
    dispatch(editTask({ id, title, priority }));
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleToggleTask = (id: string) => {
    dispatch(toggleTask(id));
  };

  return {
    tasks,
    stats,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleToggleTask,
  };
};