import { IS3Facade, presignerDataObject } from "src/interfaces/IS3Facade";
import S3Facade from "./S3Facade";

export default class FileService {
  private s3: IS3Facade;
  mimetype: string;

  constructor() {
    this.s3 = S3Facade.getInstance();
    this.mimetype = "text";
  }

  async getSignedURL(signedData: presignerDataObject) {
    return await this.s3.preSignURL(signedData);
  }

  async list() {}
  async metadata() {}
  async delete() {}
  async copy() {}
  async bulkMetadata() {}
  async bulkDelete() {}
  async bulkCopy() {}
}
