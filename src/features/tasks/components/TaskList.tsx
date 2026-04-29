import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useFilter } from '../hooks/useFilter';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { FILTER_OPTIONS } from '../constants';

const EmptyState = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400"
    role="status"
    aria-live="polite"
    aria-label="No tasks found"
  >
    <ClipboardList size={48} aria-hidden="true" />
    <p className="text-sm font-medium">No tasks yet. Add one above!</p>
  </motion.div>
));

EmptyState.displayName = 'EmptyState';



const TaskList = () => {
  const { handleAddTask, handleEditTask, handleDeleteTask, handleToggleTask, stats } = useTasks();
  const { currentFilter, filteredTasks, handleSetFilter } = useFilter();

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
        {[
          { label: 'Total', value: stats.total },
          { label: 'Completed', value: stats.completed },
          { label: 'Active', value: stats.active },
        ].map(stat => (
          <div
            key={stat.label}
            className="flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-100 shadow-sm"
          >
            <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
            <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Add Task Form */}
      <TaskForm mode="add" onAdd={handleAddTask} />

      {/* Filter */}
      <nav aria-label="Filter tasks by priority">
        <ul
          role="list"
          className="flex items-center gap-2 flex-wrap"
        >
          {FILTER_OPTIONS.map(option => (
            <li key={option.value}>
              <button
                onClick={() => handleSetFilter(option.value)}
                aria-pressed={currentFilter === option.value}
                aria-label={`Filter by ${option.label}`}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
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
      <div
        role="feed"
        aria-label="Tasks list"
        aria-busy="false"
        className="flex flex-col gap-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <EmptyState key="empty" />
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
                onEdit={handleEditTask}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TaskList;