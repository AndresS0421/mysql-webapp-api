import mysql from "mysql2/promise";

export async function loginService(user, passwd) {
    const connection = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: user,
        password: passwd,
        database: "cpremier",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    return connection;
}