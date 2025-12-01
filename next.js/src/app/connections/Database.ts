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

    public async GetReservation(val?: string): Promise<reservationData> {
        const query = val
            ? `SELECT * FROM Reserveringen WHERE ReserveringsID = ?`
            : `SELECT * FROM Reserveringen`;

        return new Promise((resolve, reject) => {
            this.pool.query(query, val ? [val] : [], (err, results) => {
                console.log(results);
                const rows = results as mysql.RowDataPacket[];
                const data: reservationData = {
                    reservationID: rows[0].ReserveringsID,
                    startDate: rows[0].DatumAankomst,
                    endDate: rows[0].DatumVertrek,
                    reservationDate: rows[0].ReserveringsDatum,
                    spot: "10: Groot",
                    amount: 10,
                };
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}
