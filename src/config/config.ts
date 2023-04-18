import * as dotenv from "dotenv";

dotenv.config();

export const environment: string = process.env.NODE_ENV
  ? (process.env.NODE_ENV as string)
  : "development";

export const app_in_production: boolean = environment === "production";

export const port: number = parseInt(process.env.PORT as string, 10);

export const account_id: string = process.env.ACCOUNT_ID || "";
export const access_key: string = process.env.ACCESS_KEY_ID || "";
export const secret_key: string = process.env.SECRET_ACCESS_KEY || "";
export const region: string = process.env.REGION || "us-east-1";

export const default_bucket: string = process.env.DEFAULT_BUCKET
  ? (process.env.DEFAULT_BUCKET as string)
  : "";

export const authToken: string = process.env.AUTH_TOKEN
  ? (process.env.AUTH_TOKEN as string)
  : "";

export const errorManagement: boolean = process.env.ERROR_MANAGEMENT === "true";
