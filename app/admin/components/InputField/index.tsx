import React from 'react';

type InputFieldProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'email' | 'password';
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  error?: string;
};

export default function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  disabled = false,
  helperText,
  error,
}: InputFieldProps) {
  return (
    <label className="flex flex-col w-full">
      <p className="text-text-light dark:text-background-light text-base font-medium pb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </p>
      <input
        className="form-input h-14 rounded-lg border border-border-light dark:border-primary/20 bg-background-light dark:bg-background-dark p-[15px] text-base text-text-light dark:text-white placeholder:text-text-muted-light focus:outline-0 focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      {helperText && !error && (
        <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">
          {helperText}
        </p>
      )}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-1">
          {error}
        </p>
      )}
    </label>
  );
}
