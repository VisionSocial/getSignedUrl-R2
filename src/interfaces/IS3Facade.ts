export interface IS3Facade {
  bucket: string | undefined;
  preSignURL: presignerFn;
  deleteObject: 
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

export type presignerFnResult = {
  error: any;
  url: string;
  expires: Date;
};

export type deleteObjectFnResult = {
  error: any;
  deleted: boolean;
};

export type presignerFn = (preSignerData: presignerDataObject) => Promise<presignerFnResult>;
export type deleteObjectFn = (preSignerData: presignerDataObject) => Promise<deleteObjectFnResult>;

export type objectCommandDataInput = {
  filename: string;
  path?: string;
  bucket?: string;
}