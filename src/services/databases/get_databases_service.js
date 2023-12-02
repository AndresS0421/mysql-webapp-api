import { loginService } from "../user/login_service.js";

export async function get_databases_service(user, passwd) {
    const connection = await loginService(user, passwd);

    const [rows, fields] = await connection.execute("SHOW DATABASES");

    const databases = rows.map(row => row.Database)

    connection.end();

    return databases;
}