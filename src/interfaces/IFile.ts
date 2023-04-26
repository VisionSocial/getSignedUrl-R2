import { ControllerResponse } from "../controllers/BaseController";

export type emptyPromiseResponse = () => Promise<ControllerResponse>;
export type stringPromiseResponse = (s: string) => Promise<ControllerResponse>;

export interface IFileClass {
  mimetype: string;
  fileData: IFileData;
  signed: emptyPromiseResponse;
  delete: emptyPromiseResponse;
  copy: stringPromiseResponse;
}

export interface IFileData {
  bucket?: string;
  folder: string;
  filename: string;
}
