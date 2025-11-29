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
                    className="p-[32px] flex w-full h-auto relative gap-[16px]"
                >
                    <div id="sidebar" className="h-full w-[256px] bg-[#272930]">
                        {/* TODO add PR'd sidebar */}
                    </div>
                    <main className="w-full h-full">{children}</main>
                </div>
            </div>
        </>
    );
}
