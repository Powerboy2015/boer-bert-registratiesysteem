import { Roboto, Roboto_Mono } from "next/font/google";

interface EditFieldComponentProps extends React.ComponentProps<"input"> {
    fieldname: string;
    data: string | number;
    spanSize?: number;
    fontSize?: number;
    lableFontSize?: number;
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
    ...props
}: EditFieldComponentProps) {
    const readOnlyStyle = props.readOnly
        ? "text-(--color-text-disabled)"
        : "text-(--color-text)";
    return (
        <span
            className={`relative`}
            style={{ gridColumn: `span ${spanSize} / span ${spanSize}` }}
        >
            <label
                className={`min-w-[110px] text-center left-4 absolute bg-(--color-background) px-1 py-0.5 text-(--color-text) shadow-(--box-shadow-label) ${roboto_default.className}`}
                style={{
                    fontSize: lableFontSize,
                }}
                htmlFor={fieldname}
            >
                {fieldname}
            </label>
            <input
                className={`w-full h-auto mt-5 p-1 bg-(--color-accent) ${readOnlyStyle} ${roboto_value.className} shadow-(--box-shadow-button)`}
                style={{
                    WebkitAppearance: "none",
                    outline: "none",
                    border: "none",
                    fontSize: fontSize,
                }}
                type="text"
                name={fieldname}
                defaultValue={data}
                {...props}
            />
        </span>
    );
}
