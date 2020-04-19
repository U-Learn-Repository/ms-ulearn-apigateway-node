import { resolve } from 'path';
import { config } from 'dotenv';

let path;
switch (process.env.NODE_ENV) {
  case 'production':
    path = '../.env';
    break;
  default:
    path = '../.env.dev';
}
config({ path: resolve(__dirname, path) });

// Mapper for environment variables
export const ENVIRONMENT = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const ENDPOINT = process.env.ENDPOINT;
