import { loginService } from "../../services/user/login_service.js";
import { VerificationError, getResponseErrorData } from "../../lib/errors/getResponseErrorData.js";

export async function login(req, res) {
    try {
        // Method Verification
        if (req.method !== "POST") {
            throw new VerificationError(405, "Request method not allowed");
        }

        // Get Params
        const { user, passwd } = req.body;

        // Validate Params
        if (!user) {
            throw new VerificationError(400, "Required params not included");
        }

        try {
            const connection = await loginService(user, passwd);

            connection.end();
        } catch (e) {
            throw new VerificationError(400, "User or password incorrect");
        }

        return res.status(200).json({ successful: true, message: "User logged" });
    } catch (e) {
        const { status, message } = getResponseErrorData(e);
        return res.status(status).json({ successful: false, message: message });
    }
}