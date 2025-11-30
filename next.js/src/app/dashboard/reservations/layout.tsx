import DeleteReservationModal from "@/app/ui/DeleteReservationModal";
import EditReservationModal from "@/app/ui/EditReservationModal";
import ModalOverlayComponent from "@/app/ui/ModalOverlayComponent";

interface reservationLayoutProps {
    children: React.ReactNode;
}
export default function reservationLayout({
    children,
}: reservationLayoutProps) {
    return (
        <>
            <div id="reservation-layout" className="w-full h-full">
                <div
                    id="background"
                    className=" w-full h-full fixed bg-(--color-background)"
                ></div>
                <div
                    id="content"
                    className="p-[32px] flex h-full max-w-[1440px] relative gap-[16px] m-auto"
                >
                    <div
                        id="sidebar"
                        className="min-h-[600px] h-[85vh] sticky top-[32px] w-[256px] bg-[#272930]"
                    >
                        {/* TODO add PR'd sidebar */}
                    </div>
                    <div className="w-full h-full relative">
                        <ModalOverlayComponent>
                            <EditReservationModal reservation={"2025-0001"} />
                            <DeleteReservationModal />
                        </ModalOverlayComponent>
                        <main className="w-full h-full">{children}</main>
                    </div>
                </div>
            </div>
        </>
    );
}
