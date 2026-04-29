import { Suspense, lazy, memo, useCallback, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import type { Task, Priority } from '../types';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

const TaskForm = lazy(() => import('./TaskForm'));

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string, priority: Priority) => void;
}

const CheckIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 12 5 5L19 8" />
  </svg>
);

const EditIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-[15px] w-[15px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const DeleteIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-[15px] w-[15px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </svg>
);

const EditFormFallback = () => (
  <div
    className="h-[198px] rounded-2xl border border-slate-200 bg-white shadow-sm"
    aria-hidden="true"
  />
);

const TaskCard = ({ task, onDelete, onToggle, onEdit }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const formattedDate = useMemo(
    () => new Date(task.createdAt).toLocaleDateString(),
    [task.createdAt],
  );
  const handleStartEditing = useCallback(() => {
    setIsEditing(true);
  }, []);
  const handleStopEditing = useCallback(() => {
    setIsEditing(false);
  }, []);
  const handleToggle = useCallback(() => {
    onToggle(task.id);
  }, [onToggle, task.id]);
  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [onDelete, task.id]);

  return (
    isEditing ? (
      <Suspense fallback={<EditFormFallback />}>
        <div className="transition-opacity duration-200">
          <TaskForm
            mode="edit"
            task={task}
            onEdit={onEdit}
            onClose={handleStopEditing}
          />
        </div>
      </Suspense>
      ) : (
        <article
          aria-label={`Task: ${task.title}`}
          className={clsx(
            'flex items-center gap-4 p-4 rounded-2xl border shadow-sm transition-[opacity,box-shadow] duration-200',
            'bg-white hover:shadow-md',
            {
              'border-slate-200 bg-slate-50/70': task.completed,
            }
          )}
        >
          {/* Checkbox */}
          <button
            onClick={handleToggle}
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            aria-pressed={task.completed}
            className={clsx(
              'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200',
              {
                'border-blue-500 bg-blue-500': task.completed,
                'border-slate-300 hover:border-blue-400': !task.completed,
              }
            )}
          >
            {task.completed && (
              <CheckIcon />
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={clsx(
              'text-sm font-medium text-slate-800 truncate',
              {
                'line-through text-slate-700': task.completed,
              }
            )}>
              {task.title}
            </p>
            <p className="mt-0.5 text-xs text-slate-700">
              {formattedDate}
            </p>
          </div>

          {/* Badge */}
          <Badge priority={task.priority} />

          {/* Actions */}
          <div role="group" aria-label="Task actions" className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleStartEditing}
              aria-label={`Edit task: ${task.title}`}
            >
              <EditIcon />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              aria-label={`Delete task: ${task.title}`}
              className="hover:text-red-500 hover:bg-red-50"
            >
              <DeleteIcon />
            </Button>
          </div>
        </article>
    ))
}
      

export default memo(TaskCard);
