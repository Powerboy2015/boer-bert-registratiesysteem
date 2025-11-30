interface EditReservationButtonProps {
    text?: string;
    color?: string;
    colSpan?: number;
}
export default function EditReservationButton({
    text = "Reservering Aanpassen",
    color = "#556483",
    colSpan = 3,
}: EditReservationButtonProps) {
    return (
        <>
            <button
                className={`p-0 w-full h-full shadow-(--box-shadow-button) inset-shadow-(--inner-shadow-button) border-none cursor-pointer`}
                style={{
                    backgroundColor: color,
                    gridColumn: `span ${colSpan} / span ${colSpan}`,
                }}
            >
                <div className="flex p-[10px] text-[24px] text-(--color-text)">
                    <p className="w-full h-full m-[0px]">{text}</p>
                    <p className="m-[0px]">X</p>
                </div>
            </button>
        </>
    );
}
