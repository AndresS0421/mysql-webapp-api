import { use_database_service } from "../../services/databases/use_database_service.js";
import { VerificationError, getResponseErrorData } from "../../lib/errors/getResponseErrorData.js";

export async function use_database_controller(req, res) {
    try {
        // Method Verification
        if (req.method !== "POST") {
            throw new VerificationError(405, "Request method not allowed");
        }

        // Get Params
        const { user, passwd, database } = req.body;

        // Validate Params
        if (!user || !database) {
            throw new VerificationError(400, "Required params not included");
        }

        // Action
        let tables = null;
        try {
            tables = await use_database_service(user, passwd, database);
        } catch (e) {
            throw new VerificationError(400, "Operation could not be done");
        }

        return res.status(200).json({successful: true, tables: tables, database: database});
    } catch (e) {
        const { status, message } = getResponseErrorData(e);
        return res.status(status).json({successful: false, message: message});
    }
}