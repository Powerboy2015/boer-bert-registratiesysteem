import  mysql, { Connection, ResultSetHeader } from 'mysql2/promise'

export default class db {
    
    static #instance: db;
    private connection: Promise<Connection>;

    //We don't use the constructor to create db instances, 
    // we use the Instance in order to call functions.
    //In this constructor we just create the connection to the database and pray it works when we use it.
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

    /**
     * A simple wrapper for a select query. Asks for a response type and a query. 
     * Partial in this case just makes every field optional.
     * @param query the query string used to do a select query
     * @param values values that go with the query (incase you have some.)
     * @param <T> used to explain which return type you are expecting.
     * @returns A list of type <T> that you have given (I hope)
     */
    public async selectQuery<T>(query:string, values?: any): Promise<Partial<T>[]> {
        // makes sure we have a connection first.
        const db = await this.connection;

        const [results] = await db.execute(query,values);
        return results as T[];
       }
    
    public async createQuery(query:string,values?: any): Promise<ResultSetHeader> {
        //makes sure we have a connection first.
        const db = await this.connection;

        const [results] = await db.execute(query,values);
        return results as ResultSetHeader;

    }
}