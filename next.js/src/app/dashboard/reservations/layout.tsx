interface reservationLayoutProps {
    children: React.ReactNode
}
export default function reservationLayout({children}: reservationLayoutProps) {

    return(<main>
        <h1>Hello welcome to our reservation page!</h1>
        {children}
    </main>);
}