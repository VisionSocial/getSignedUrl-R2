import {
  ACCESS_KEY,
  SECRET_KEY,
  ACCOUNT_ID,
  DEFAULT_BUCKET,
  REGION,
} from "../config/config";
import {
  S3Client,
  ListBucketsCommand,
  ListObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  GetObjectCommandInput,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  IS3Facade,
  presignerDataObject,
  signOperations,
} from "../interfaces/IS3Facade";

export default class S3Facade implements IS3Facade {
  bucket: string | undefined;
  private _s3: S3Client;
  private static _instance: S3Facade;

  private constructor() {
    this._s3 = new S3Client({
      region: REGION,
      endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY,
      },
    });
    this.bucket = DEFAULT_BUCKET;
  }

  // Singleton
  public static getInstance(): S3Facade {
    if (!S3Facade._instance) {
      S3Facade._instance = new S3Facade();
    }

    return S3Facade._instance;
  }

  async preSignURL(data: presignerDataObject) {
    try {
      const {
        filename,
        operation,
        bucket = this.bucket,
        path = "",
        expiresIn = 3600,
      } = data;
      const result = {
        error: null,
        url: "",
        expires: new Date(Date.now() + expiresIn * 1000),
      };

      const objectCommand: GetObjectCommandInput = {
        Bucket: bucket,
        Key: path + "/" + filename,
      };

      if (operation === "READ") {
        result.url = await getSignedUrl(
          this._s3,
          new GetObjectCommand(objectCommand),
          { expiresIn }
        );
      }

      if (operation === "WRITE") {
        result.url = await getSignedUrl(
          this._s3,
          new PutObjectCommand(objectCommand),
          { expiresIn }
        );
      }

      return result;
    } catch (e) {
      console.log(e);
      return { error: e, url: "" };
    }
  }
}
