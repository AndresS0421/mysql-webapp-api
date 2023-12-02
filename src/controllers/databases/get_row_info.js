import { get_row_info_service } from "../../services/databases/get_row_info_service.js";
import { VerificationError, getResponseErrorData } from "../../lib/errors/getResponseErrorData.js";

export async function get_row_info_controller(req, res) {
    try {
        // Method Verification
        if (req.method !== "GET") {
            throw new VerificationError(405, "Request method not allowed");
        }

        // Get Params
        const { user, passwd, database, table, id_name, row_id } = req.query;

        // Validate Params
        if (!user || !database || !table || !id_name || !row_id) {
            throw new VerificationError(400, "Required params not included");
        }

        // Action
        let row = null;
        try {
            row = await get_row_info_service(user, passwd, database, table, id_name, row_id);
        } catch (e) {
            throw new VerificationError(400, "Operation could not be done");
        }

        return res.status(200).json({successful: true, row: row, database: database, table: table});
    } catch (e) {
        const { status, message } = getResponseErrorData(e);
        return res.status(status).json({successful: false, message: message});
    }
}