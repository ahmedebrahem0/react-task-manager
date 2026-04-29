import { Suspense, lazy, memo, useEffect, useMemo } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useFilter } from '../hooks/useFilter';
import TaskCard from './TaskCard';
import { FILTER_OPTIONS } from '../constants';

const loadTaskForm = () => import('./TaskForm');
const loadEmptyStateIcon = () =>
  import('lucide-react').then(module => ({ default: module.ClipboardList }));

const TaskForm = lazy(loadTaskForm);
const EmptyStateIcon = lazy(loadEmptyStateIcon);

const TASK_STATS = [
  { key: 'total', label: 'Total' },
  { key: 'completed', label: 'Completed' },
  { key: 'active', label: 'Active' },
] as const;

const EmptyState = memo(() => (
  <div
    className="flex flex-col items-center justify-center gap-3 py-16 text-slate-600"
    role="status"
    aria-live="polite"
    aria-label="No tasks found"
  >
    <Suspense fallback={<div className="h-12 w-12 rounded-2xl bg-slate-200/70" aria-hidden="true" />}>
      <EmptyStateIcon aria-hidden="true" className="h-12 w-12" strokeWidth={1.75} />
    </Suspense>
    <p className="text-sm font-medium">No tasks yet. Add one above!</p>
  </div>
));

EmptyState.displayName = 'EmptyState';

const TaskFormFallback = () => (
  <div
    className="h-[198px] rounded-2xl border border-slate-200 bg-white shadow-sm"
    aria-hidden="true"
  />
);

const TaskList = () => {
  const { handleAddTask, handleEditTask, handleDeleteTask, handleToggleTask, stats } = useTasks();
  const { currentFilter, filteredTasks, handleSetFilter } = useFilter();
  const statsCards = useMemo(() => (
    TASK_STATS.map(({ key, label }) => ({
      label,
      value: stats[key],
    }))
  ), [stats]);

  useEffect(() => {
    const preloadTaskForm = () => {
      void loadTaskForm();
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(preloadTaskForm);

      return () => {
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = window.setTimeout(preloadTaskForm, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (filteredTasks.length > 0) {
      return;
    }

    void loadEmptyStateIcon();
  }, [filteredTasks.length]);

  return (
    <section
      aria-label="Task Manager"
      className="w-full max-w-2xl mx-auto flex flex-col gap-6"
    >
      {/* Stats */}
      <div
        role="status"
        aria-live="polite"
        aria-label={`${stats.total} tasks, ${stats.completed} completed, ${stats.active} active`}
        className="grid grid-cols-3 gap-3"
      >
        {statsCards.map(stat => (
          <div
            key={stat.label}
            className="flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-200 shadow-sm"
          >
            <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
            <span className="text-xs text-slate-600 font-medium">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Add Task Form */}
      <Suspense fallback={<TaskFormFallback />}>
        <TaskForm mode="add" onAdd={handleAddTask} />
      </Suspense>

      {/* Filter */}
      <nav aria-label="Filter tasks by priority">
        <ul
          role="list"
          className="flex items-center gap-2 flex-wrap"
        >
          {FILTER_OPTIONS.map(option => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSetFilter(option.value)}
                aria-pressed={currentFilter === option.value}
                aria-label={`Filter by ${option.label}`}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
                  ${currentFilter === option.value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
                  }
                `}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Tasks */}
      {filteredTasks.length === 0 ? (
        <EmptyState />
      ) : (
        <ul
          role="list"
          aria-label="Tasks list"
          aria-busy="false"
          className="flex flex-col gap-3"
        >
          {filteredTasks.map(task => (
            <li key={task.id}>
              <TaskCard
                task={task}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
                onEdit={handleEditTask}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default TaskList;
