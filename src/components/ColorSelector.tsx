import React, { useState } from "react";

interface ColorSelectorProps {
    className: string;
    disabled?: boolean;
    label: string;
    layout: "vertical" | "horizontal";
    onChange: any;
    value: string;
}

const ColorSelector = ({
    className,
    disabled,
    label,
    layout,
    onChange,
    value,
}: ColorSelectorProps) => {
    const handleChange = (value: string) => {
        onChange(value);
    };

    return (
        <div className={className}>
            <label
                className={`color-selector ${layout} ${disabled ? "disabled" : ""}`}
            >
                <input
                    disabled={disabled}
                    className="color-selector__color-input"
                    onChange={(event) => handleChange(event.target.value)}
                    type="color"
                    value={value}
                />
                <span>
                    <p className="color-selector__color-value">{value}</p>
                    <p className="color-selector__color-name">{label}</p>
                </span>
            </label>
        </div>
    );
};

export default ColorSelector;
