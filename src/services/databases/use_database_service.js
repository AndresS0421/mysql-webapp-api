import { loginService } from "../user/login_service.js";

export async function use_database_service(user, passwd, database) {
    const connection = await loginService(user, passwd);

    await connection.execute(`USE ${database}`);

    const [rows, fields] = await connection.execute("SHOW TABLES");

    connection.end();

    return rows;
}