import {IFileData} from './IFile'

export interface IS3Facade {
	bucket: string | undefined,
	preSignURL: (m: string, fd: IFileData) => Promise<any>,
}

export interface IS3Params {
	Bucket: string,
	Expires?: number,
	ACL?: string,
	Key: string,
	ContentType?: string,
	CopySource?: string
}

export interface IS3Response {
	status: boolean,
	url?: string,
	nameFile?: string,
	error?: any,
	content?: any
	deleted?: any
}