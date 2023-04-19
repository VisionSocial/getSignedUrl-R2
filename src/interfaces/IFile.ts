import {ControllerResponse} from '../controllers/BaseController'
import { IS3Facade } from './IS3Facade'

export type emptyPromiseResponse = () => Promise<ControllerResponse>
export type stringPromiseResponse = (s: string) => Promise<ControllerResponse>

export interface IFileClass {
	mimetype: string,
	fileData: IFileData,
	signed: emptyPromiseResponse
	delete: emptyPromiseResponse
	copy: stringPromiseResponse
}

export interface IFileData {
	bucket?: string,
	folder: string,
	filename: string
}