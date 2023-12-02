import { get_table_content_service } from "../../services/databases/get_table_content_service.js";
import { VerificationError, getResponseErrorData } from "../../lib/errors/getResponseErrorData.js";

export async function get_table_content_controller(req, res) {
    try {
        // Method Verification
        if (req.method !== "GET") {
            throw new VerificationError(405, "Request method not allowed");
        }

        // Get Params
        const { user, passwd, database, table } = req.query;

        // Validate Params
        if (!user || !database || !table) {
            throw new VerificationError(400, "Required params not included");
        }

        // Action
        let table_content = null;
        try {
            table_content = await get_table_content_service(user, passwd, database, table);
        } catch (e) {
            throw new VerificationError(400, "Operation could not be done");
        }

        return res.status(200).json({successful: true, table: table_content, database: database, table: table});
    } catch (e) {
        const { status, message } = getResponseErrorData(e);
        return res.status(status).json({successful: false, message: message});
    }
}