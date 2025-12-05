import  mysql, { Connection } from 'mysql2/promise'

export default async function getDB(): Promise<Connection> {
    const pool = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
    })

return pool;
}
