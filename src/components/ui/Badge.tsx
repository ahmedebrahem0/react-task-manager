import { clsx } from 'clsx';
import type { Priority } from '../../features/tasks/types';

interface BadgeProps {
  priority: Priority;
  className?: string;
}

const priorityConfig: Record<Priority, { label: string; className: string; ariaLabel: string }> = {
  High: {
    label: 'High',
    ariaLabel: 'Priority: High',
    className: 'bg-red-100 text-red-700 ring-1 ring-red-200',
  },
  Medium: {
    label: 'Medium',
    ariaLabel: 'Priority: Medium',
    className: 'bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200',
  },
  Low: {
    label: 'Low',
    ariaLabel: 'Priority: Low',
    className: 'bg-green-100 text-green-700 ring-1 ring-green-200',
  },
};

const Badge = ({ priority, className }: BadgeProps) => {
  const config = priorityConfig[priority];

  return (
    <span
  className={clsx(
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none',
    config.className,
    className
  )}
>
  {config.label}
</span>
  );
};

export default Badge;