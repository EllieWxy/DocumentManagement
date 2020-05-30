import fetch from './fetch'

export interface IBaseFile {
    title: string,
    content: string,
    father: string
}

export interface IFile extends IBaseFile{
    fid: string,
    updateTime: number,
    createTime: number
}

export function getFileByID(fid:string):Promise<IFile> {
    return fetch(`/file/${fid}`)
}

export function getFile():any{
    return fetch('/file')
}

export function updateFile(fid:string,body:IBaseFile) {
    return fetch(`/file/${fid}`,'PUT',body)
}

export function createFile(body:IBaseFile) {
    return fetch('/file','POST',body)
}

export function removeFile(fid:string) {
    return fetch(`/file/${fid}`,'DELETE')
}
