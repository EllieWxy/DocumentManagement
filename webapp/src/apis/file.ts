import { BASE_URL } from 'config'
import fetch from './fetch'

const FILE_API_PREFIX = `${BASE_URL}/file`

export interface IBaseFile {
  title: string
  content: string
  father: string
}

export interface IFile extends IBaseFile {
  fid: string
  updateTime: number
  createTime: number
  childNodes?: object
}

export function getFileByID(fid: string): Promise<IFile> {
  return fetch(`${FILE_API_PREFIX}/${fid}`)
}

export function getFile(): Promise<IFile> {
  return fetch(FILE_API_PREFIX)
}

export function updateFile(fid: string, baseFile: IBaseFile) {
  return fetch(`${FILE_API_PREFIX}/${fid}`, 'PUT', baseFile)
}

export function createFile(baseFile: IBaseFile) {
  return fetch(FILE_API_PREFIX, 'POST', baseFile)
}

export function removeFile(fid: string) {
  return fetch(`${FILE_API_PREFIX}/${fid}`, 'DELETE')
}

export function searchFile(search: string) {
  return fetch(`${FILE_API_PREFIX}/search/${search}`)
}
