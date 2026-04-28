import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, Priority,TasksState } from '../types';
import { loadFromStorage, saveToStorage } from '../../../utils/localStorage';
import { v4 as uuidv4 } from 'uuid';


const initialState: TasksState = {
  tasks: loadFromStorage<Task[]>('tasks') ?? [],
  filter: 'All',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; priority: Priority }>) => {
      const newTask: Task = {
        id: uuidv4(),
        title: action.payload.title,
        priority: action.payload.priority,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
      saveToStorage('tasks', state.tasks);
    },

    editTask: (state, action: PayloadAction<{ id: string; title: string; priority: Priority }>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.priority = action.payload.priority;
        saveToStorage('tasks', state.tasks);
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      saveToStorage('tasks', state.tasks);
    },

    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveToStorage('tasks', state.tasks);
      }
    },

    setFilter: (state, action: PayloadAction<Priority | 'All'>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTask, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;