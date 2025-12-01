import { read } from "fs";
import { Roboto, Roboto_Mono } from "next/font/google";

interface EditFieldComponentProps {
    fieldname: string;
    data: string | number;
    spanSize?: number;
    fontSize?: number;
    lableFontSize?: number;
    readOnly?: boolean;
}

const roboto_value = Roboto_Mono({
    variable: "--roboto_mono_value",
    weight: "400",
    subsets: ["latin"],
});

const roboto_default = Roboto({
    variable: "--roboto-default",
    weight: "400",
    subsets: ["latin"],
});

export default function EditFieldComponent({
    fieldname,
    data,
    spanSize,
    fontSize = 32,
    lableFontSize = 20,
    readOnly = false,
}: EditFieldComponentProps) {
    return (
        <span
            className={`relative`}
            style={{ gridColumn: `span ${spanSize} / span ${spanSize}` }}
        >
            <label
                className={`min-w-[110px] text-center left-[16px] absolute bg-(--color-background) px-[4px] py-[2px] text-(--color-text) shadow-(--box-shadow-label) ${roboto_default.className}`}
                style={{
                    fontSize: lableFontSize,
                }}
                htmlFor={fieldname}
            >
                {fieldname}
            </label>
            <input
                className={`w-full h-auto mt-[20px] p-[4px] bg-(--color-accent) text-(--color-text) ${roboto_value.className} shadow-(--box-shadow-button)`}
                style={{
                    WebkitAppearance: "none",
                    outline: "none",
                    border: "none",
                    fontSize: fontSize,
                }}
                type="text"
                name={fieldname}
                defaultValue={data}
                readOnly={readOnly}
            />
        </span>
    );
}
