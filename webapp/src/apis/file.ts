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

export function updateFile(fid:string,body:IBaseFile) { //直接用IBaseFile 不需要类型校验
    return fetch(`/file/${fid}`,'PUT',body)
}

export function createFile(body:IBaseFile) {
    return fetch('/file','POST',body)
}
