import React from "react";

interface ColorSelectorProps {
    className?: string;
    disabled?: boolean;
    onChange: any;
    options: any[];
    placeholder: string;
    title: string;
    value: string;
}

const Select = ({
    className,
    disabled,
    onChange,
    options,
    placeholder,
    title,
    value,
}: ColorSelectorProps) => {
    const handleChange = (value: string) => {
        onChange(value);
    };

    return (
        <div className={`select ${disabled ? "disabled" : ""}`}>
            <label>
                <select
                    disabled={disabled}
                    title={title}
                    value={value}
                    onChange={(e) =>
                        handleChange(e.target.value)
                    }
                >
                    <option value="">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default Select;
