import { Reservering } from "@/app/reserveringen/Widgets/Reserveringen";

interface DesktopReservationModalProps {
    res: Reservering;
}
export default function DesktopReservationModal({ res }: DesktopReservationModalProps) {
    return (
        <>
            <h1>Hello world</h1>
            <h1>{res.Email}</h1>
        </>
    );
}
