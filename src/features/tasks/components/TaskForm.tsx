import { useCallback, useId, useState } from 'react';
import { clsx } from 'clsx';
import type { Task, Priority } from '../types';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

interface TaskFormProps {
  mode: 'add' | 'edit';
  task?: Task;
  onAdd?: (title: string, priority: Priority) => void;
  onClose?: () => void;
  onEdit?: (id: string, title: string, priority: Priority) => void;
}

const PRIORITY_OPTIONS = [
  { value: 'High', label: '🔴 High' },
  { value: 'Medium', label: '🟡 Medium' },
  { value: 'Low', label: '🟢 Low' },
];

const TaskForm = ({ mode, task, onAdd, onClose, onEdit }: TaskFormProps) => {
  const formId = useId();

  const [title, setTitle] = useState(task?.title ?? '');
  const [priority, setPriority] = useState<Priority>(task?.priority ?? 'Medium');
  const [error, setError] = useState('');

  const validate = useCallback((trimmedTitle: string): boolean => {
    if (!trimmedTitle) {
      setError('Task title is required');
      return false;
    }
    if (trimmedTitle.length < 3) {
      setError('Title must be at least 3 characters');
      return false;
    }
    setError('');
    return true;
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!validate(trimmedTitle)) return;

    if (mode === 'add' && onAdd) {
      onAdd(trimmedTitle, priority);
      setTitle('');
      setPriority('Medium');
    } else if (mode === 'edit' && task && onEdit) {
      onEdit(task.id, trimmedTitle, priority);
      onClose?.();
    }
  }, [mode, onAdd, onClose, onEdit, priority, task, title, validate]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) {
      setError('');
    }
  }, [error]);

  const handlePriorityChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as Priority);
  }, []);

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      noValidate
      aria-label={mode === 'add' ? 'Add new task' : 'Edit task'}
      className={clsx(
        'flex flex-col gap-4 p-4 rounded-2xl border bg-white shadow-sm',
        { 'border-blue-100': mode === 'add' },
        { 'border-slate-200': mode === 'edit' },
      )}
    >
      <Input
        label="Task Title"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleTitleChange}
        error={error}
        fullWidth
        autoFocus={mode === 'add'}
        aria-required="true"
      />

      <Select
        label="Priority"
        options={PRIORITY_OPTIONS}
        value={priority}
        onChange={handlePriorityChange}
        fullWidth
        aria-required="true"
      />

      <div className="flex items-center gap-2 justify-end">
        {mode === 'edit' && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClose}
            aria-label="Cancel editing"
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          variant="primary"
          size="sm"
          aria-label={mode === 'add' ? 'Add task' : 'Save changes'}
        >
          {mode === 'add' ? 'Add Task' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
