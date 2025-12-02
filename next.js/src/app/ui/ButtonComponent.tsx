interface ButtonComponentProps extends React.ComponentProps<"button"> {
    text?: string;
    color?: string;
}
export default function ButtonComponent({
    text = "reservering aanpassen",
    color = "#556483",
    ...props
}: ButtonComponentProps) {
    return (
        <>
            <button
                className={`p-0 col-span-3 w-full h-full shadow-(--box-shadow-button) inset-shadow-(--inner-shadow-button) border-none cursor-pointer`}
                style={{
                    backgroundColor: color,
                }}
                {...props}
            >
                <div className="flex p-2.5 text-[24px] text-(--color-text)">
                    <p className="w-full h-full m-0">{text}</p>
                    <p className="m-0">X</p>
                </div>
            </button>
        </>
    );
}
