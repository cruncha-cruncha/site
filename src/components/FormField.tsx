import { useState } from "react";

export type ArgTypes = {
  id: string;
  label: string;
  value?: string;
  child?: React.ReactNode;
  className?: string;
  isValid?: boolean;
  pattern?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export const FormField = ({
  id,
  label,
  value: initialValue = "",
  child,
  className = "",
  pattern,
  isValid: externalIsValid = true,
  inputProps = {},
}: ArgTypes) => {
  const [value, setValue] = useState(initialValue);
  const isValid = pattern
    ? new RegExp(pattern).test(value)
    : initialValue
      ? value === initialValue
      : externalIsValid;

  return (
    <fieldset className={`border-b-2 border-r-2 border-black ${className}`}>
      <div className="bg-transparent p-1 pt-0">
        {!child ? (
          <label
            htmlFor={id}
            className={"block h-4 text-sm" + (!isValid ? " text-red-600" : "")}
          >
            {label}
          </label>
        ) : (
          <legend
            className={"block h-4 text-sm" + (!isValid ? " text-red-600" : "")}
          >
            {label}
          </legend>
        )}
      </div>
      {!child ? (
        <div className="input-container">
          {/* t/b = top/bottom, l/r = left/right, h/v = horizontal/vertical */}
          <div className="input-border-tlh" />
          <div className="input-border-blh" />
          <div className="input-border-trh" />
          <div className="input-border-brh" />
          <div className="input-border-tlv" />
          <div className="input-border-blv" />
          <div className="input-border-trv" />
          <div className="input-border-brv" />
          <input
            id={id}
            type="text"
            // defaultValue={initialValue}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="font-special-elite w-full bg-transparent px-3 pt-1 text-2xl text-black"
            placeholder={initialValue}
            {...inputProps}
          />
        </div>
      ) : (
        child
      )}
    </fieldset>
  );
};
