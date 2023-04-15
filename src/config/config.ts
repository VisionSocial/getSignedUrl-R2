import * as dotenv from "dotenv";

dotenv.config();

interface AmazonCredentials {
  client_id: string;
  client_secret: string;
  region: string;
}

export const environment: string = process.env.NODE_ENV
  ? (process.env.NODE_ENV as string)
  : "development";

export const __prod__: boolean = environment === "production";

export const PORT: number = parseInt(process.env.PORT as string, 10);

  console.log(process.env.PORT);
  

export const AWSCredentials: AmazonCredentials = {
  client_id: process.env.ACCESS_KEY_ID
    ? (process.env.ACCESS_KEY_ID as string)
    : "",
  client_secret: process.env.SECRET_ACCESS_KEY
    ? (process.env.SECRET_ACCESS_KEY as string)
    : "",
  region: process.env.REGION ? (process.env.REGION as string) : "",
};

export const bucketDefault: string = process.env.BUCKET_DEFAULT
  ? (process.env.BUCKET_DEFAULT as string)
  : "";

export const authToken: string = process.env.AUTH_TOKEN
  ? (process.env.AUTH_TOKEN as string)
  : "";

export const errorManagement: boolean =
  process.env.ERROR_MANAGEMENT === "true";
