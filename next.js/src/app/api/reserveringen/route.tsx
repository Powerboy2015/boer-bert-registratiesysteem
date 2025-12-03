import mariadb from "mariadb";
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'my-secret-pw',
    connectionLimit: 5,
    database: "mydatabase"
});

export function serializeBigInt<T>(data: T): T {
    return JSON.parse(
        JSON.stringify(data, (_, value) =>
            typeof value === "bigint" ? value.toString() : value
        )
    );
}

export async function GET(): Promise<Response> {
    let conn;
    try {
        conn = await pool.getConnection();
        const data = await conn.query("SELECT * from Reserveringen");
        return Response.json(serializeBigInt(data))
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
}

