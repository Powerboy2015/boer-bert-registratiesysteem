import mysql, { Query } from "mysql2";
export interface reservationData {
    reservationID: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    spot: string;
    reservationDate: Date;
}

export interface editableReservationFields {
    startDate?: Date;
    endDate?: Date;
    spot?: string;
    amount?: number;
}

class DbPool {
    private static instance: DbPool;
    private pool: any; // your mysql2 pool

    private constructor() {
        // Initialize your pool here
        this.pool = mysql.createPool({
            host: "localhost",
            user: "boer_bert_user",
            password: "secure_password_change_me",
            database: "boer_bert_db",
            waitForConnections: true,
            connectionLimit: 10, // Limit connections
            queueLimit: 0,
        });
    }

    public static getInstance(): DbPool {
        if (!DbPool.instance) {
            DbPool.instance = new DbPool();
        }
        return DbPool.instance;
    }

    // ...existing code...

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

    public async DeleteReservation(reservationID: string): Promise<boolean> {
        const query = `DELETE FROM Reserveringen WHERE ReserveringsID = ?`;

        return new Promise((resolve, reject) => {
            this.pool.query(query, [reservationID], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }

                const result = results as mysql.ResultSetHeader;
                resolve(result.affectedRows > 0);
            });
        });
    }

    public async UpdateReservation(
        reservationID: string,
        args: editableReservationFields
    ): Promise<boolean> {
        const updates: string[] = [];
        const values: any[] = [];

        if (args.startDate !== undefined) {
            updates.push("DatumAankomst = ?");
            values.push(args.startDate);
        }
        if (args.endDate !== undefined) {
            updates.push("DatumVertrek = ?");
            values.push(args.endDate);
        }
        // if (args.spot !== undefined) {
        //     updates.push("Spot = ?");
        //     values.push(args.spot);
        // }
        // if (args.amount !== undefined) {
        //     updates.push("Amount = ?");
        //     values.push(args.amount);
        // }

        if (updates.length === 0) {
            return false;
        }

        values.push(reservationID);
        const query = `UPDATE Reserveringen SET ${updates.join(
            ", "
        )} WHERE ReserveringsID = ?`;

        return new Promise((resolve, reject) => {
            this.pool.query(query, values, (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }

                const result = results as mysql.ResultSetHeader;
                resolve(result.affectedRows > 0);
            });
        });
    }

    public async CreateReservation(
        startDate: Date,
        endDate: Date,
        spot: string,
        amount: number
    ): Promise<string> {
        const query = `INSERT INTO Reserveringen (ReserveringsID,UserDataID, DatumAankomst, DatumVertrek, ReserveringsDatum) VALUES (2030-0781,1,?, ?, NOW())`;

        return new Promise((resolve, reject) => {
            this.pool.query(
                query,
                [
                    endDate.toISOString().split("T")[0],
                    endDate.toISOString().split("T")[0],
                ],
                (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const result = results as mysql.ResultSetHeader;
                    resolve(result.insertId.toString());
                }
            );
        });
    }
}

export default DbPool.getInstance();
