interface ButtonComponentProps {
    text?: string;
    color?: string;
    children: React.ReactNode;
}
export default function ButtonComponent({
    text = "reservering aanpassen",
    color = "#556483",
    children,
}: ButtonComponentProps) {
    return (
        <>
            <button
                className={`relative p-0 col-span-3 w-full h-full shadow-(--box-shadow-button) inset-shadow-(--inner-shadow-button) border-none cursor-pointer`}
                style={{
                    backgroundColor: color,
                }}
            >
                <div className="flex p-[10px] text-[24px] text-(--color-text)">
                    <p className="w-full h-full m-[0px]">{text}</p>
                    <div className="absolute left-0 top-0 w-full h-full">
                        {children}
                    </div>
                </div>
            </button>
        </>
    );
}
