export interface IS3Facade {
  bucket: string | undefined;
  preSignURL: presignerFn;
}

export interface IS3Params {
  Bucket: string;
  Expires?: number;
  ACL?: string;
  Key: string;
  ContentType?: string;
  CopySource?: string;
}

export interface IS3Response {
  status: boolean;
  url?: string;
  nameFile?: string;
  error?: any;
  content?: any;
  deleted?: any;
}

export type signOperations = "READ" | "WRITE";

export type presignerDataObject = {
  filename: string;
  operation: signOperations;
  mimetype?: string;
  path?: string;
  bucket?: string;
  expiresIn?: number;
};

export type presignerFn = (preSignerData: presignerDataObject) => Promise<any>;
