import fetch from './fetch'

export interface IBaseFile {
    title: String,
    content: String
}

export interface IFile extends IBaseFile{
    fid:String,
    updateTime:Number,
    createTime:Number
}

export function getFileByID(fid:string):Promise<IBaseFile> {
    return fetch(`/file/${fid}`,'GET')
}

export function getFile(){
    return fetch('/file','GET')
}

export function updateFile(fid:string,title?:string,content?:string) {
    let body = {
        title:title || '',
        content:content || ''
    }
    return fetch(`/file/${fid}`,'PUT',body)
}

export function createFile(title:string,content?:string,father?:string) {
    let body = {
        title:title,
        content:content || '',
        father:father || ''
    }
    return fetch('/file','POST',body)

}
