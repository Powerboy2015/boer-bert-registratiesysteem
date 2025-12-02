import SideBar from "@/app/Sidebar/sidebar";
import DeleteReservationModal from "@/app/ui/DeleteReservationModal";
import EditReservationModal from "@/app/ui/EditReservationModal";
import ModalEnablerComponent from "@/app/ui/ModalEnablerComponent";
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
                    <SideBar />
                    <div className="w-full h-full relative">
                        <ModalEnablerComponent>
                            <ModalOverlayComponent name="EditReservation">
                                <EditReservationModal
                                    reservation={"2025-0001"}
                                />
                            </ModalOverlayComponent>
                            <ModalOverlayComponent name="DeleteReservation">
                                <DeleteReservationModal />
                            </ModalOverlayComponent>
                            <main className="w-full h-full">{children}</main>
                        </ModalEnablerComponent>
                    </div>
                </div>
            </div>
        </>
    );
}
