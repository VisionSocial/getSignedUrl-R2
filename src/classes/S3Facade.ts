import {
  ACCESS_KEY,
  SECRET_KEY,
  DEFAULT_BUCKET,
  REGION,
  ENDPOINT,
} from "../config/config";
import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  GetObjectCommandInput,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  CopyObjectCommandInput,
  CopyObjectCommand,
  ListObjectsCommandInput,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  IS3Facade,
  copyObjectParams,
  fileParams,
  listObjectFnResult,
  listObjectParams,
  objectFnResult,
  presignerFnParams,
  presignerFnResult,
} from "../interfaces/IS3Facade";
import * as Path from "path";

export default class S3Facade implements IS3Facade {
  bucket: string;
  private _s3: S3Client;
  private static _instance: S3Facade;

  private constructor() {
    this._s3 = new S3Client({
      region: REGION,
      endpoint: ENDPOINT,
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

  async preSignURL(data: presignerFnParams) {
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

  async copyObject(copyData: copyObjectParams) {
    const { filename, from, bucket = this.bucket, path = "" } = copyData;
    const result: objectFnResult = {
      error: null,
      success: false,
    };

    const objectCommand: CopyObjectCommandInput = {
      Bucket: bucket,
      Key: Path.join(path, filename),
      CopySource: from,
    };

    try {
      const res = await this._s3.send(new CopyObjectCommand(objectCommand));
      result.success = res.$metadata.httpStatusCode === 200;
    } catch (e) {
      result.error = e;
    }

    return result;
  }

  async listObject(dataList: listObjectParams) {
    const { path = "", bucket = this.bucket } = dataList;

    const result: listObjectFnResult = {
      error: null,
      result: [],
      delimiter: "",
      maxKeys: 0,
      bucket: "",
      isTruncated: false,
    };

    const objectCommand: ListObjectsCommandInput = {
      Bucket: bucket,
      Prefix: Path.join(path, '/'),
    };

    try {
      const res = await this._s3.send(new ListObjectsCommand(objectCommand));
      result.result = res.Contents || [];
      result.delimiter = res.Delimiter;
      result.isTruncated = res.IsTruncated;
    } catch (e) {
      result.error = e;
    }

    return result;
  }

  async deleteObject(data: fileParams) {
    const { filename, path = "", bucket = this.bucket } = data;

    const result: objectFnResult = {
      error: null,
      success: false,
    };

    const objectCommand: DeleteObjectCommandInput = {
      Bucket: bucket,
      Key: Path.join(path, filename),
    };

    try {
      const res = await this._s3.send(new DeleteObjectCommand(objectCommand));
      result.success = res.$metadata.httpStatusCode === 204;
    } catch (e) {
      result.error = e;
    }

    return result;
  }
}
