import { InputHTMLAttributes, forwardRef } from 'react';
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
  ...props
}, ref) => {
  return (
    <div className={clsx('flex flex-col gap-1', { 'w-full': fullWidth })}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(
          'px-3 py-2 rounded-lg border text-sm transition-all duration-200 outline-none',
          'placeholder:text-gray-400',
          {
            'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100': !error,
            'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100': error,
            'w-full': fullWidth,
            'opacity-50 cursor-not-allowed bg-gray-50': props.disabled,
          },
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;