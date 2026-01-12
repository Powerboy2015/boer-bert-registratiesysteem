import  mysql, { Connection } from 'mysql2/promise'

export default class db {
    
    static #instance: db;
    private connection: Promise<Connection>;

    //We don't use the constructor to create db instances, we use the Instance in order to call functions.
    private constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME
            })
    }


    //We will be using this function in order to get the same db instance everywhere,
    //Which lets us use the db connection without having to remake it.
    public static get instance(): db {
        if (!db.#instance) {
            db.#instance = new db();
        }
        return db.#instance;
    }
}