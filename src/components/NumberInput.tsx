import React, { useState } from "react";

interface NumberInputProps {
  className?: string;
  label: string;
  onChange: any;
  unit?: string;
  value: number;
}

const NumberInput = ({
  className,
  label,
  onChange,
  value,
  unit,
}: NumberInputProps) => {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className={`number-input ${className ? className : ""}`}>
      <label>
        <span className="number-input__label">{label}</span>
        <input
          type="number"
          value={value}
          onChange={(event) => handleChange(event.target.value)}
        />
        <span className="number-input__unit">{unit}</span>
      </label>
    </div>
  );
};

export default NumberInput;
