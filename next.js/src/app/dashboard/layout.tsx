
interface reservationLayoutProps {
    children: React.ReactNode
}
export default function reservationLayout({children}: reservationLayoutProps) {

    return(<div className="w-full h-full flex flex-row bg-(--color-background) p-[32px] gap-[16px]">
        <div className="sidebar h-full w-[256px] bg-[#272930]">
            {/* TODO Update this once sidebar has been properly PR'd */}
        </div>
        <div className="main w-full h-full">
            {children} 
        </div>
    </div>);
}