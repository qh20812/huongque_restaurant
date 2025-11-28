import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  showToggle?: boolean;
  inputClassName?: string;
  hideLabel?: boolean;
};

export default function InputField({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  showToggle = false,
  hideLabel = false,
  inputClassName = "",
  ...rest
}: InputFieldProps) {
  const [show, setShow] = React.useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && show ? "text" : type;

  return (
    <div className="flex flex-col">
      {!hideLabel && label && (
        <p className="pb-2 text-base font-medium text-text-light dark:text-text-dark">{label}</p>
      )}
      <div className="relative flex w-full flex-1 items-stretch">
        <input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={inputType}
          className={`form-input h-14 w-full flex-1 resize-none overflow-hidden rounded-lg border border-border-light bg-background-light p-4 pr-12 text-base font-normal leading-normal text-text-light placeholder:text-subtle-light focus:border-primary focus:outline-0 focus:ring-0 focus:ring-primary/50 dark:border-border-dark dark:bg-background-dark dark:text-text-dark dark:placeholder:text-subtle-dark dark:focus:border-primary ${inputClassName}`}
          {...rest}
        />
        {isPassword && showToggle && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setShow((prev) => !prev);
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-subtle-light dark:text-subtle-dark"
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
          >
            <span className="material-symbols-outlined">{show ? "visibility" : "visibility_off"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
