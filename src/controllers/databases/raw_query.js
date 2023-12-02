import { VerificationError, getResponseErrorData } from "../../lib/errors/getResponseErrorData.js";

export async function raw_query_controller(req, res) {
    try {
        // Method Verification
        if (req.method !== "POST") {
            throw new VerificationError(405, "Request method not allowed");
        }

        // Get Params
        const { user, passwd, database, query } = req.body;

        // Validate Params
        if (!user || !database || !query) {
            throw new VerificationError(400, "Required params not included");
        }

        // Action
        let response = null;

        
        return res.status(200).json({successful: true, database: database, response: response});
    } catch (e) {
        const { status, message } = getResponseErrorData(e);
        return res.status(status).json({successful: false, message: message});
    }
}