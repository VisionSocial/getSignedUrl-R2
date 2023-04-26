export interface IS3Facade {
  bucket: string | undefined;
  preSignURL: presignerFn;
  deleteObject: deleteObjectFn;
  copyObject: copyObjectFn;
  listObject: listObjectFn;
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
  error: unknown;
  url: string;
  expires: Date;
};

export type presignerFn = (
  preSignerData: presignerFnParams
) => Promise<presignerFnResult>;

export type objectFnResult = {
  error: unknown;
  success: boolean;
};

export type deleteObjectFn = (
  fileParams: fileParams
) => Promise<objectFnResult>;

export type copyObjectParams = fileParams & { from: string };

export type copyObjectFn = (
  copyObjectParams: copyObjectParams
) => Promise<objectFnResult>;

export type listObjectParams = {
  path?: string;
  bucket: string;
};

export type listObjectFnResult = {
  error: unknown;
  result: Array<object>;
  delimiter?: string;
  maxKeys: number;
  bucket: string;
  isTruncated?: boolean;
};

export type listObjectFn = (
  listObjectParams: listObjectParams
) => Promise<listObjectFnResult>;
