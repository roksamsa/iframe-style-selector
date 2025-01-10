import React, { useState, useRef, useEffect } from "react";
import ColorSelector from "./components/ColorSelector";
import NumberInput from "./components/NumberInput";
import Select from "./components/Select";

interface FormDataType {
    [key: string]: any; // Add index signature
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;
        link: string;
        text: string;
    };
    bodyBackground: {
        imageUrl: string;
        backgroundColor: string;
    };
    generalText: {
        font: string;
        fontSize: number;
    };
    buttonStyle: {
        backgroundColor: string;
        textColor: string;
        borderRadius: number;
        sameAsPrimary: boolean;
    };
    inputStyle: {
        backgroundColor: string;
        textColor: string;
        borderRadius: number;
    };
}

const fontsArray = [
    { value: "Arial", label: "Arial" },
    { value: "Verdana", label: "Verdana" },
    { value: "Tahoma", label: "Tahoma" },
    { value: "Trebuchet MS", label: "Trebuchet MS" },
    { value: "Georgia", label: "Georgia" },
    { value: "Times New Roman", label: "Times New Roman" },
    { value: "Courier New", label: "Courier New" },
    { value: "Roboto", label: "Roboto" },
    { value: "Open Sans", label: "Open Sans" },
    { value: "Lato", label: "Lato" },
    { value: "Montserrat", label: "Montserrat" },
    { value: "Poppins", label: "Poppins" },
    { value: "Source Sans Pro", label: "Source Sans Pro" },
    { value: "Noto Sans", label: "Noto Sans" },
    { value: "Merriweather", label: "Merriweather" },
    { value: "Playfair Display", label: "Playfair Display" },
    { value: "Ubuntu", label: "Ubuntu" },
    { value: "PT Sans", label: "PT Sans" },
    { value: "Raleway", label: "Raleway" },
    { value: "Oswald", label: "Oswald" }
];

const App = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [cssText, setCssText] = useState<string>("");
    const [iframeUrl, setIframeUrl] = useState<string>("http://localhost:3001/");

    const [formData, setFormData] = useState<FormDataType>({
        colors: {
            primary: "#9E00FF",
            secondary: "#9E00FF",
            tertiary: "#9E00FF",
            link: "#9E00FF",
            text: "#3A3A3A",
        },
        bodyBackground: {
            imageUrl: "",
            backgroundColor: "#FFFFFF",
        },
        generalText: {
            font: "",
            fontSize: 14,
        },
        buttonStyle: {
            backgroundColor: "#9E00FF",
            textColor: "#FFFFFF",
            borderRadius: 5,
            sameAsPrimary: false,
        },
        inputStyle: {
            backgroundColor: "#FFFFFF",
            textColor: "#3A3A3A",
            borderRadius: 5,
        },
    });

    const generateCSS = (formData: any) => {
        return `
/* Colors */
:root {
  --primary-color: ${formData.colors.primary};
  --secondary-color: ${formData.colors.secondary};
  --tertiary-color: ${formData.colors.tertiary};
  --link-color: ${formData.colors.link};
  --text-color: ${formData.colors.text};
}

/* General Text */
body, p, h1, h2, h3, h4, h5, h6 {
  font-family: ${formData.generalText.font || "inherit"};
  font-size: ${formData.generalText.fontSize || "inherit"}px;
  color: var(--text-color);
}

/* Button Style */
button {
  background-color: ${formData.buttonStyle.sameAsPrimary
                ? formData.colors.primary
                : formData.buttonStyle.backgroundColor
            };
  color: ${formData.buttonStyle.textColor};
  border-radius: ${formData.buttonStyle.borderRadius}px;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}

/* Input Style */
input, textarea, select {
  background-color: ${formData.inputStyle.backgroundColor};
  color: ${formData.inputStyle.textColor};
  border-radius: ${formData.inputStyle.borderRadius}px;
  border: 1px solid #ccc;
  padding: 8px;
}
  `;
    };

    const handleChange = (
        section: string,
        field: string,
        value: string | number,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    const handleSave = () => {
        const jsonText = generateCSS(formData);
        setCssText(jsonText);

        if (iframeRef.current && iframeRef.current.contentWindow) {
            const msg = {
                type: "cssUpdate",
                data: jsonText,
            };
            iframeRef.current.contentWindow.postMessage(msg, "*");
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const value = queryParams.get("iframeUrl");
        setIframeUrl(value || "");
    }, []);

    return (
        <div className="styling-editor">
            <div className="styling-editor__left">
                {/* Colors Definition */}
                <section>
                    <h3>Colors definition</h3>
                    <div className="styling-editor__columns colors">
                        {Object.entries(formData?.colors).map(([key, value]) => (
                            <div className="styling-editor__column" key={key}>
                                <ColorSelector
                                    className="styling-editor__color"
                                    label={key.charAt(0).toUpperCase() + key.slice(1) + "color"}
                                    layout="vertical"
                                    value={value}
                                    onChange={(event: any) => handleChange("colors", key, event)}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* General Text Style */}
                <section>
                    <h3>General text style</h3>
                    <div className="styling-editor__columns">
                        <div className="styling-editor__column">
                            <Select options={fontsArray} value={formData.generalText.font} title="Font style" placeholder="Select font..." onChange={(newValue: any) =>
                                handleChange("generalText", "font", newValue)
                            } />
                        </div>
                        <div className="styling-editor__column">
                            <NumberInput
                                label="Font size"
                                unit="px"
                                value={formData.generalText.fontSize}
                                onChange={(newNumber: number) =>
                                    handleChange("generalText", "fontSize", newNumber)
                                }
                            />
                        </div>
                    </div>
                </section>

                {/* Button Style */}
                <section>
                    <h3>Button style</h3>
                    <div className="styling-editor__columns">
                        <div className="styling-editor__column">
                            <ColorSelector
                                className="styling-editor__color"
                                label="Background color"
                                layout="horizontal"
                                disabled={formData.buttonStyle.sameAsPrimary}
                                value={formData.buttonStyle.backgroundColor}
                                onChange={(event: any) =>
                                    handleChange("buttonStyle", "backgroundColor", event)
                                }
                            />
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={formData.buttonStyle.sameAsPrimary}
                                    onChange={(event: any) =>
                                        handleChange(
                                            "buttonStyle",
                                            "sameAsPrimary",
                                            event.target.checked,
                                        )
                                    }
                                />
                                Same as primary color?
                            </label>
                            <NumberInput
                                label="Border radius"
                                value={formData.buttonStyle.borderRadius}
                                onChange={(newNumber: number) =>
                                    handleChange("buttonStyle", "borderRadius", newNumber)
                                }
                            />
                        </div>
                        <div className="styling-editor__column">
                            <ColorSelector
                                className="styling-editor__color"
                                label="Text color"
                                layout="horizontal"
                                value={formData.buttonStyle.textColor}
                                onChange={(event: any) =>
                                    handleChange("buttonStyle", "textColor", event)
                                }
                            />
                        </div>
                    </div>
                </section>

                {/* Input Style */}
                <section>
                    <h3>Input style</h3>
                    <div className="styling-editor__columns">
                        <div className="styling-editor__column">
                            <ColorSelector
                                className="styling-editor__color"
                                label="Background color"
                                layout="horizontal"
                                value={formData.inputStyle.backgroundColor}
                                onChange={(event: any) =>
                                    handleChange("inputStyle", "backgroundColor", event)
                                }
                            />
                            <NumberInput
                                className="margin-top"
                                label="Border radius"
                                value={formData.inputStyle.borderRadius}
                                onChange={(newNumber: number) =>
                                    handleChange("inputStyle", "borderRadius", newNumber)
                                }
                            />
                        </div>
                        <div className="styling-editor__column">
                            <ColorSelector
                                className="styling-editor__color"
                                label="Text color"
                                layout="horizontal"
                                value={formData.inputStyle.textColor}
                                onChange={(event: any) =>
                                    handleChange("inputStyle", "textColor", event)
                                }
                            />
                        </div>
                    </div>
                </section>

                {/* Buttons */}
                <div style={{ marginTop: "20px" }}>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
            <div className="styling-editor__right">
                <div className="styling-editor__iframe">
                    <iframe ref={iframeRef} src={iframeUrl}></iframe>
                </div>
            </div>
        </div>
    );
};

export default App;
