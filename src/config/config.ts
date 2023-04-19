import * as dotenv from "dotenv";

dotenv.config();

export const ENVIROMENT: string = process.env.NODE_ENV
  ? (process.env.NODE_ENV as string)
  : "development";

export const APP_IN_PRODUCTION: boolean = ENVIROMENT === "production";

export const PORT: number = parseInt(process.env.PORT as string, 10);

export const ACCOUNT_ID: string = process.env.ACCOUNT_ID || "";
export const ACCESS_KEY: string = process.env.ACCESS_KEY_ID || "";
export const SECRET_KEY: string = process.env.SECRET_ACCESS_KEY || "";
export const REGION: string = process.env.REGION || "us-east-1";

export const DEFAULT_BUCKET: string = process.env.DEFAULT_BUCKET
  ? (process.env.DEFAULT_BUCKET as string)
  : "";

export const AUTH_TOKEN: string = process.env.AUTH_TOKEN
  ? (process.env.AUTH_TOKEN as string)
  : "";

export const ERROR_MANAGEMENT: boolean = process.env.ERROR_MANAGEMENT === "true";
