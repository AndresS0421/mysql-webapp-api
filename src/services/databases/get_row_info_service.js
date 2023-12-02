import { loginService } from "../user/login_service.js";

export async function get_row_info_service(user, passwd, database, table, id_name, row_id) {
    const connection = await loginService(user, passwd);

    await connection.execute(`USE ${database}`);

    const [rows, fields] = await connection.execute(`SELECT * FROM ${table} WHERE ${id_name} = ${row_id}`);

    connection.end();

    return rows;
}