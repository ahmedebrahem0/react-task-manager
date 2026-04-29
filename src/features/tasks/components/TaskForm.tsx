import { useState, useId } from 'react';
import { clsx } from 'clsx';
import type { Task, Priority } from '../types';
import { useTasks } from '../hooks/useTasks';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

interface TaskFormProps {
  mode: 'add' | 'edit';
  task?: Task;
  onClose?: () => void;
  onEdit?: (id: string, title: string, priority: Priority) => void;
}

const PRIORITY_OPTIONS = [
  { value: 'High', label: '🔴 High' },
  { value: 'Medium', label: '🟡 Medium' },
  { value: 'Low', label: '🟢 Low' },
];

const TaskForm = ({ mode, task, onClose, onEdit }: TaskFormProps) => {
  const formId = useId();
  const { handleAddTask } = useTasks();

  const [title, setTitle] = useState(task?.title ?? '');
  const [priority, setPriority] = useState<Priority>(task?.priority ?? 'Medium');
  const [error, setError] = useState('');

  const validate = (): boolean => {
    if (!title.trim()) {
      setError('Task title is required');
      return false;
    }
    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === 'add') {
      handleAddTask(title.trim(), priority);
      setTitle('');
      setPriority('Medium');
    } else if (mode === 'edit' && task && onEdit) {
      onEdit(task.id, title.trim(), priority);
      onClose?.();
    }
  };

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
        onChange={e => {
          setTitle(e.target.value);
          if (error) setError('');
        }}
        error={error}
        fullWidth
        autoFocus={mode === 'add'}
        aria-required="true"
      />

      <Select
        label="Priority"
        options={PRIORITY_OPTIONS}
        value={priority}
        onChange={e => setPriority(e.target.value as Priority)}
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