import { InputHTMLAttributes, forwardRef, useId } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  fullWidth = false,
  className,
  id,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={clsx('flex flex-col gap-1.5', { 'w-full': fullWidth })}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="text-sm font-semibold text-slate-700 ml-0.5 cursor-pointer"
        >
          {label}
        </label>
      )}
      
      <input
        ref={ref}
        id={inputId}
        // Accessibility Props
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={clsx(
          'px-4 py-2.5 rounded-xl border text-sm transition-colors duration-200 outline-none shadow-sm',
          'placeholder:text-slate-500',
          {
            'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10': !error,
            'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10': error,
            'w-full': fullWidth,
            'opacity-50 cursor-not-allowed bg-slate-50': props.disabled,
          },
          className
        )}
        {...props}
      />
      
      {error && (
        <span 
          id={errorId} 
          className="text-xs text-red-500 ml-1 font-medium animate-in fade-in slide-in-from-top-1"
        >
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
