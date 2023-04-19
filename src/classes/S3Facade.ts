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
  DeleteObjectCommand,
  DeleteObjectCommandInput,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  IS3Facade,
  objectCommandDataInput,
  presignerDataObject,
  presignerFnResult,
} from "../interfaces/IS3Facade";
import * as Path from "path";

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
    const {
      filename,
      operation,
      bucket = this.bucket,
      path = "",
      expiresIn = 3600,
    } = data;

    const result: presignerFnResult = {
      error: null,
      url: "",
      expires: new Date(Date.now() + expiresIn * 1000),
    };

    const objectCommand: GetObjectCommandInput = {
      Bucket: bucket,
      Key: Path.join(path, filename),
    };

    try {
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
    } catch (e) {
      console.log(e);
      result.error = e;
    }

    return result;
  }

  async copyObject() {}
  async listObject() {}

  async deleteObject(data: objectCommandDataInput) {
    const { filename, path = "", bucket = this.bucket } = data;

    const result = {
      error: null,
      deleted: false,
    };

    try {
      
    } catch (error) {
      
    }
    const objectCommand: DeleteObjectCommandInput = {
      Bucket: bucket,
      Key: Path.join(path, filename),
    };

    const res = await this._s3.send(new DeleteObjectCommand(objectCommand));
    result.deleted = !!res;
    console.log(res);

    return result;
  }
}
