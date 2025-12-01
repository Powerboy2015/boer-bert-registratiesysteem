import mysql, { Query } from "mysql2";
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

export default class DbPool {
    private pool: mysql.Pool;

    constructor() {
        this.pool = mysql.createPool({
            host: "localhost",
            user: "boer_bert_user",
            password: "secure_password_change_me",
            database: "boer_bert_db",
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    private DoQuery(
        query: string,
        callback: (
            err: mysql.QueryError | null,
            results: mysql.QueryResult,
            fields: mysql.FieldPacket[]
        ) => object
    ): Query {
        return this.pool.query(query, callback);
    }

    /**
     * Looks for reservations, which can be specified through reservationData.
     * @param val any reservation value
     * @returns a reservationdata obect
     */
    public async GetReservation(
        val?: string
    ): Promise<reservationData | reservationData[]> {
        const query = val
            ? `SELECT * FROM Reserveringen WHERE ReserveringsID = ?`
            : `SELECT * FROM Reserveringen`;

        // creates a new async that finished when the db query is finished and mapped properly.
        return new Promise((resolve, reject) => {
            this.pool.query(query, val ? [val] : [], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }

                const rows = results as mysql.RowDataPacket[];
                const data: reservationData[] = rows.map((row) => ({
                    reservationID: row.ReserveringsID,
                    startDate: row.DatumAankomst,
                    endDate: row.DatumVertrek,
                    reservationDate: row.ReserveringsDatum,
                    spot: "10: Groot",
                    amount: 10,
                }));

                resolve(val ? data[0] : data);
            });
        });
    }
}
