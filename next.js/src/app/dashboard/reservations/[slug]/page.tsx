import Database from "@/app/connections/Database"

interface ViewReservationProps {
    params: Promise<{slug: string}>
}
export default async function Page({params}:ViewReservationProps) {
    const {slug} = await params
    const db: Database = new Database;
    const reservationData = db.getReservation(slug);


    return(<div>{JSON.stringify(reservationData)}</div>);

}