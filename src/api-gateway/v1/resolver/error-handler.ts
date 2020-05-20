import { AxiosError } from "axios";
import logger from "../../../logger";

export class ErrorHandler {

    public static handle(error: any): any {
        if (this.isAxiosError(error)) {
            return this.handleAxiosError(error);
        }
        return logger.error(error);
    }

    private static isAxiosError(error: any): boolean {
        return (error as AxiosError).isAxiosError !== undefined;
    }

    private static handleAxiosError(error: AxiosError) {
        let errorLog = {};
        if (error.response) {
            errorLog = {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers,
            }
        } else if (error.request) {
            errorLog = {
                message: error.message,
                config: error.config,
            }
        }
        logger.error(errorLog);
        return errorLog;
    }
}