interface reservationData {
    reservationID: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    spot: string;
    reservationDate: Date;
}

interface editableReservationFields {
    startDate?: Date;
    endDate?: Date;
    spot?: string;
    amount?: number;
}

export default class Database {
    private connection: string;

    constructor() {
        this.connection = "hello";
    }

    /** gets resrevation data based on the given reservationID
     *  @param reservationID the attached reservationID
     *  @returns reservationData -  An object that holds all reservationData
     */
    public getReservation(reservationID: string): reservationData {
        // TODO write database functionality in order to get reservation data from database
        // TODO add handling for when reservationID doesn't exist

        const reservation: reservationData = {
            reservationID: "2025-0001",
            startDate: new Date(),
            endDate: new Date(),
            amount: 8,
            spot: "10: Groot",
            reservationDate: new Date(),
        };
        return reservation;
    }

    /**
     * updates an reservation through the use of a reservationID and the args of which field is to be altered
     * @param reservationID the reservationId of the reservation
     * @param args the editable fields
     * @returns a success or fail message
     */
    public UpdateReservation(
        reservationID: string,
        args: editableReservationFields
    ): boolean {
        // TODO write handling to the database
        // TODO check which args are given and update those fields.
        return true;
    }
}
