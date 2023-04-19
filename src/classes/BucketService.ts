import { IS3Facade, presignerDataObject } from "src/interfaces/IS3Facade";
import S3Facade from "./S3Facade";

export default class BucketService {
  private s3: IS3Facade;
  mimetype: string;

  constructor() {
    this.s3 = S3Facade.getInstance();
  }

  async add() {}
  async list() {}
  async delete() {}
  async copy() {}
}
