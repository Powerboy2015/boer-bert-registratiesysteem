import { Roboto, Roboto_Mono } from "next/font/google";

interface DisplayFieldComponentProps {
    fieldname: string;
    data: string | number;
    spanSize?: number;
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

export default function DisplayFieldComponent({
    fieldname,
    data,
    spanSize,
}: DisplayFieldComponentProps) {
    return (
        <span className={`relative col-span-${spanSize ?? 1}`}>
            <label
                className={`min-w-[110px] text-center left-[16px] absolute bg-(--color-accent-2) px-[4px] py-[2px] text-[20px] text-(--color-text) shadow-(--box-shadow-label) ${roboto_default.className}`}
                htmlFor={fieldname}
            >
                {fieldname}
            </label>
            <input
                className={`w-full h-auto mt-[20px] p-[4px] bg-(--color-accent) text-[32px] text-(--color-text) ${roboto_value.className} shadow-(--box-shadow-field)`}
                style={{
                    WebkitAppearance: "none",
                    outline: "none",
                    border: "none",
                }}
                type="text"
                name={fieldname}
                value={data}
                readOnly
            />
        </span>
    );
}
