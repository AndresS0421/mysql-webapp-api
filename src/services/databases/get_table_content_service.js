import { loginService } from "../user/login_service.js";

export async function get_table_content_service(user, passwd, database, table) {
    const connection = await loginService(user, passwd);

    await connection.execute(`USE ${database}`);

    const [rows, fields] = await connection.execute(`SELECT * FROM ${table}`);

    connection.end();

    return rows;
}