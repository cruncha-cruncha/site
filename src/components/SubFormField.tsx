import { useEffect, useState } from "react";

export type ArgTypes = {
  id: string;
  label: string;
  value?: string;
  className?: string;
  onIsValid?: (isValid: boolean) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export const SubFormField = ({
  id,
  label,
  value: initialValue = "",
  className = "",
  onIsValid = () => {},
  inputProps = {},
}: ArgTypes) => {
  const [value, setValue] = useState(initialValue);
  const isValid = initialValue ? value === initialValue : true;

  useEffect(() => {
    onIsValid(isValid);
  }, [isValid]);

  return (
    <fieldset className={`relative ${className}`}>
      <div className="input-container">
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
          className="font-special-elite w-full bg-transparent px-3 pt-1 text-2xl"
          {...inputProps}
        />
      </div>
      <div className="absolute bottom-0 bg-transparent px-1">
        <label
          htmlFor={id}
          className={"text-xxs block h-3" + (!isValid ? " text-red-600" : "")}
        >
          {label}
        </label>
      </div>
    </fieldset>
  );
};
