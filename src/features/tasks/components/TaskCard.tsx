import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Pencil, Check } from 'lucide-react';
import { clsx } from 'clsx';
import type { Task, Priority } from '../types';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import TaskForm from './TaskForm';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string, priority: Priority) => void;
}

const TaskCard = ({ task, onDelete, onToggle, onEdit }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {isEditing ? (
        <motion.div
          key="edit"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <TaskForm
            mode="edit"
            task={task}
            onEdit={onEdit}
            onClose={() => setIsEditing(false)}
          />
        </motion.div>
      ) : (
        <motion.article
          key="view"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          aria-label={`Task: ${task.title}`}
          className={clsx(
            'flex items-center gap-4 p-4 rounded-2xl border shadow-sm transition-all duration-200',
            'bg-white hover:shadow-md',
            { 'opacity-60': task.completed }
          )}
        >
          {/* Checkbox */}
          <button
            onClick={() => onToggle(task.id)}
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            aria-pressed={task.completed}
            className={clsx(
              'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200',
              {
                'border-blue-500 bg-blue-500': task.completed,
                'border-slate-300 hover:border-blue-400': !task.completed,
              }
            )}
          >
            {task.completed && (
              <Check size={14} className="text-white" aria-hidden="true" />
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={clsx(
              'text-sm font-medium text-slate-800 truncate',
              { 'line-through text-slate-400': task.completed }
            )}>
              {task.title}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Badge */}
          <Badge priority={task.priority} />

          {/* Actions */}
          <div role="group" aria-label="Task actions" className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              aria-label={`Edit task: ${task.title}`}
            >
              <Pencil size={15} aria-hidden="true" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete task: ${task.title}`}
              className="hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 size={15} aria-hidden="true" />
            </Button>
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );
};

export default TaskCard;