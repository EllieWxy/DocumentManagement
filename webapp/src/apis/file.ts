import fetch from './fetch'

export interface IBaseFile {
    title: string,
    content: string,
    father: string
}

export interface IFile extends IBaseFile{
    fid: string,
    updateTime: number,
    createTime: number,
    childNodes?: object
}

export function getFileByID(fid:string):Promise<IFile> {
    return fetch(`/file/${fid}`)
}

export function getFile():Promise<IFile>{
    return fetch('/file')
}

export function updateFile(fid:string,baseFile:IBaseFile) {
    return fetch(`/file/${fid}`,'PUT',baseFile)
}

export function createFile(baseFile:IBaseFile) {
    return fetch('/file','POST',baseFile)
}

export function removeFile(fid:string) {
    return fetch(`/file/${fid}`,'DELETE')
}
