interface reservationData {
    reservationID: string
    startDate: Date
    endDate: Date
    amount: number
}


export default class Database {
    private connection: string
    
    constructor() {
        this.connection = "hello"
    }
    
    // gets reservationData based off of reservation ID
    public getReservation(reservationID:string): reservationData {
        // TODO write database functionality in order to get reservation data from database
        // TODO add handling for when reservationID doesn't exist

        const reservation: reservationData = {
            reservationID: "2025-0001",
            startDate: new Date(),
            endDate: new Date(),
            amount: 8
        }
        return reservation;
    }
}