import  mysql from 'mysql2/promise'

export default async function getDB() {
    const pool = await mysql.createConnection({
    host: "145.89.192.178",
    user: "db",
    password: "strongpassword",
    database: "boerbert"
})

return pool;
}