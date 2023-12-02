import { get_databases_service } from "../../services/databases/get_databases_service.js";
import { VerificationError, getResponseErrorData } from "../../lib/errors/getResponseErrorData.js";

export async function get_databases_controller(req, res) {
    try {
        // Method Verification
        if (req.method !== "GET") {
            throw new VerificationError(405, "Request method not allowed");
        }

        // Get Params
        const { user, passwd } = req.query;

        // Validate Params
        if (!user) {
            throw new VerificationError(400, "Required params not included");
        }

        // Action
        let databases = null;
        try {
            databases = await get_databases_service(user, passwd);
        } catch (e) {
            throw new VerificationError(400, "Operation could not be done");
        }

        return res.status(200).json({successful: true, databases: databases});
    } catch (e) {
        const { status, message } = getResponseErrorData(e);
        return res.status(status).json({successful: false, message: message});
    }
}