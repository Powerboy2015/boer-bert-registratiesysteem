import EditFieldComponent from "./EditFieldComponent";
import EditReservationButton from "./EditReservationButton";

interface EditReservationModalProps {
    reservation: string;
}
export default function EditReservationModal({
    reservation,
}: EditReservationModalProps) {
    return (
        <>
            <div className="w-[50%] h-[50%] bg-(--color-accent-2) flex flex-col">
                <div id="title" className="w-full h-1/3 bg-[#405D98]">
                    <h2>Reservering aanpassen: {reservation}</h2>
                </div>
                <div className="w-full h-2/3 bg-(--color-accent-2) grid px-[32px] py-[16px] grid-cols-2 grid-rows-4 gap-[16px]">
                    <EditFieldComponent
                        fieldname="ReserveringsNummer"
                        data={reservation}
                        fontSize={24}
                        lableFontSize={16}
                        readOnly
                    />
                    <EditFieldComponent
                        fieldname="ReserveringsDatum"
                        data={"10 nov 2025"}
                        fontSize={24}
                        lableFontSize={16}
                        readOnly
                    />
                    <EditFieldComponent
                        fieldname="AankomstDatum"
                        data={"10 nov 2025"}
                        fontSize={24}
                        lableFontSize={16}
                    />
                    <EditFieldComponent
                        fieldname="VertrekDatum"
                        data={"10 nov 2025"}
                        fontSize={24}
                        lableFontSize={16}
                    />
                    <EditFieldComponent
                        fieldname="Plaats"
                        data={"plaats 10: groot"}
                        fontSize={24}
                        lableFontSize={16}
                        spanSize={2}
                    />
                    <EditReservationButton colSpan={1} text={"Terug"} />
                    <EditReservationButton
                        colSpan={1}
                        text={"Opslaan"}
                        color="#55835A"
                    />
                </div>
            </div>
        </>
    );
}
