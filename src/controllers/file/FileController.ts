import BaseController from "../BaseController";
import { IFileClass, IFileData } from "../../interfaces/IFile";
import FileService from "../../classes/FileService";

export default class FileController extends BaseController {
  fileData: IFileData;
  file: any;
  mimetype: string = "text/plain";

  constructor(fileData: IFileData, mimetype: string = "text/plain") {
    super();
    this.mimetype = mimetype;
    this.fileData = fileData;
    this.file = new FileService();
  }

  public signed = async () => {
    const signedUrl: any = await this.file.getSignedURL({
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
  };
}
