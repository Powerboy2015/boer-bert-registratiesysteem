"use client";

const roboto = Roboto({
    weight: "400",
});
interface ReservationButtonComponentProps {
    text?: string;
    color?: string;
    colSpan?: number;
    btnCallback?: () => void;
}
export default function ReservationButtonComponent({
    text = "Reservering Aanpassen",
    color = "#556483",
    colSpan = 3,
    btnCallback,
}: ReservationButtonComponentProps) {
    return (
        <>
            <button
                className={`p-0 w-full h-full shadow-(--box-shadow-button) inset-shadow-(--inner-shadow-button) border-none cursor-pointer`}
                style={{
                    backgroundColor: color,
                    gridColumn: `span ${colSpan} / span ${colSpan}`,
                }}
                onClick={() => {
                    if (btnCallback) {
                        btnCallback();
                    }
                }}
            >
                <div className={`${roboto.className} flex p-2.5 text-[24px] text-(--color-text)`}>
                    <div className="flex p-2.5 text-[24px] text-(--color-text)">
                        <p className="w-full h-full m-0">{text}</p>
                    </div>
                </div>
            </button>
        </>
    );
}
