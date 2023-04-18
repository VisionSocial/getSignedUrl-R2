import {
  access_key,
  secret_key,
  account_id,
  default_bucket,
} from "src/config/config";
import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { IS3Facade, IS3Response } from "src/interfaces/IS3Facade";
import { IFileData } from "src/interfaces/IFile";

export default class S3Facade implements IS3Facade {
  bucket: string | undefined;
  private _s3: S3Client;

  constructor() {
    this._s3 = new S3Client({
      region: "auto",
      endpoint: `https://${account_id}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: access_key,
        secretAccessKey: secret_key,
      },
    });
    this.bucket = default_bucket;
  }

  async preSignURL(mimetype: string, fileData: IFileData) {
    try {
      // Use the expiresIn property to determine how long the presigned link is valid.
      console.log(
        await getSignedUrl(
          this._s3,
          new GetObjectCommand({ Bucket: this.bucket, Key: "dog.png" }),
          { expiresIn: 3600 }
        )
      );
      // https://my-bucket-name.<accountid>.r2.cloudflarestorage.com/dog.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential<credential>&X-Amz-Date=<timestamp>&X-Amz-Expires=3600&X-Amz-Signature=<signature>&X-Amz-SignedHeaders=host&x-id=GetObject

      // You can also create links for operations such as putObject to allow temporary write access to a specific key.
      console.log(
        await getSignedUrl(
          this._s3,
          new PutObjectCommand({ Bucket: this.bucket, Key: "dog.png" }),
          { expiresIn: 3600 }
        )
      );
    } catch (e) {}

    return {};
  }
}
