import { SelectHTMLAttributes, forwardRef, useId } from 'react';
import { clsx } from 'clsx';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  options,
  fullWidth = false,
  className,
  id,
  ...props
}, ref) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  const errorId = `${selectId}-error`;

  return (
    <div className={clsx('flex flex-col gap-1.5', { 'w-full': fullWidth })}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-semibold text-slate-700 ml-0.5 cursor-pointer"
        >
          {label}
        </label>
      )}

      <select
        ref={ref}
        id={selectId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={clsx(
          'px-4 py-2.5 rounded-xl border text-sm transition-colors duration-200 outline-none shadow-sm bg-white appearance-none cursor-pointer',
          {
            'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10': !error,
            'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10': error,
            'w-full': fullWidth,
            'opacity-50 cursor-not-allowed bg-slate-50': props.disabled,
          },
          className
        )}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <span
          id={errorId}
          role="alert"
          className="text-xs text-red-500 ml-1 font-medium"
        >
          {error}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
