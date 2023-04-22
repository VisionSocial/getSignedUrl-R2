export interface IS3Facade {
  bucket: string | undefined;
  preSignURL: presignerFn;
  deleteObject: deleteObjectFn;
}

export interface IS3Response {
  status: boolean;
  url?: string;
  nameFile?: string;
  error?: any;
  content?: any;
  deleted?: any;
}

export type fileParams = {
  filename: string;
  path?: string;
  bucket?: string;
};

export type signOperations = "READ" | "WRITE";

export type presignerFnParams = {
  filename: string;
  operation: signOperations;
  mimetype?: string;
  path?: string;
  bucket?: string;
  expiresIn?: number;
};

export type presignerFnResult = {
  error: any;
  url: string;
  expires: Date;
};

export type presignerFn = (
  preSignerData: presignerFnParams
) => Promise<presignerFnResult>;

export type deleteObjectFnResult = {
  error: any;
  deleted: boolean;
};

export type deleteObjectFn = (
  preSignerData: fileParams
) => Promise<deleteObjectFnResult>;
