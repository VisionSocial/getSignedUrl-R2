import BaseController from "../BaseController";
import { IFileData } from "../../interfaces/IFile";
import S3Facade from "../../classes/S3Facade";
import { IS3Facade } from "src/interfaces/IS3Facade";

export default class FileController extends BaseController {
  fileData: IFileData;
  mimetype: string = "text/plain";
  private S3: IS3Facade;

  constructor(fileData: IFileData, mimetype: string = "text/plain") {
    super();
    this.mimetype = mimetype;
    this.fileData = fileData;
    this.S3 = S3Facade.getInstance();
  }

  public async signed() {
    const signedUrl: any = await this.S3.preSignURL({
      filename: this.fileData.filename,
      path: this.fileData.folder,
      operation: "WRITE",
      bucket: this.fileData.bucket,
    });
    if (!signedUrl.error) {
      return this.makeResponse(
        {
          url: signedUrl.url || "",
          expires: signedUrl.expires || "",
        },
        200
      );
    } else {
      return this.makeResponse(
        {
          error: signedUrl.error || "",
        },
        500
      );
    }
  }

  public async delete() {
    const deleted: any = await this.S3.deleteObject({
      filename: this.fileData.filename,
      path: this.fileData.folder,
      bucket: this.fileData.bucket,
    });
    if (!deleted.error) {
      return this.makeResponse(
        {
          deleted: true,
        },
        200
      );
    } else {
      return this.makeResponse(
        {
          error: deleted.error || "",
        },
        500
      );
    }
  }
}
