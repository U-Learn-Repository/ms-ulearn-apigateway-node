import logger from "../../../logger";
import { AxiosError } from "axios";

export class ErrorHandler {
    public static handle(error: any) {
        if (this.isAxiosError(error)) {
            return this.handleAxiosError(error);
        }
        return logger.error(error);
    }

    private static isAxiosError(error: any): boolean {
        return (error as AxiosError).isAxiosError !== undefined;
    }

    private static handleAxiosError(error: AxiosError) {
        if (error.response) {
            let errorLog = {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers,
            }
            logger.error(errorLog);
        } else if (error.request) {
            let errorLog = {
                message: error.message,
                config: error.config,
            }
            logger.error(errorLog);
        }
    }
}