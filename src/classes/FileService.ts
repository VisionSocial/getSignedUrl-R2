import { IS3Facade, presignerDataObject } from "src/interfaces/IS3Facade";
import S3Facade from "./S3Facade";

export default class FileService {
  private s3: IS3Facade;
  mimetype: string;

  constructor() {
    this.s3 = S3Facade.getInstance();
  }

  async getSignedURL(signedData: presignerDataObject) {
    return await this.s3.preSignURL(signedData);
  }

  async list() {}
  async metadata() {}
  async delete() {
    return await this.s3.deleteObject(data: objectCommandDataInput)
  }
  async copy() {}
  async bulkMetadata() {}
  async bulkDelete() {}
  async bulkCopy() {}
}
