import React from "react";

interface IInputProps {
  name: string;
  label: string;
  id: string;
  type?: string;
  value?: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  classNameInput?: string;
  classNameLabel?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

function Input({
  id,
  type = "text",
  name,
  value,
  error,
  label,
  required = false,
  helpText = "",
  classNameInput = "",
  classNameLabel = "",
  handleChange,
  ...props
}: IInputProps) {
  let errorStyles = "";
  if (error) {
    errorStyles = "input-error";
  }

  return (
    <li className={errorStyles}>
      <input id={id} className={classNameInput} type={type} name={name} value={value} required={required} onChange={handleChange} {...props} />
      <label className={classNameLabel} htmlFor={id}>
        {label}
      </label>

      {/* render error or helpText or nothing */}
      {error ? <p className="input__helper-text">{error}</p> : helpText && <p className="input__helper-text">{helpText}</p>}
    </li>
  );
}

export default Input;
