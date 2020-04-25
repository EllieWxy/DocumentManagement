import fetch from './fetch'
//没有对file的结构进行定义

export function getFileByID(fid:string) {
    return fetch(`/file/${fid}`,'GET')
}

export function getFile() {
    // let params = {}
    // if(fid){
    //     params = {fid:fid}
    // }
    return fetch('/file','GET')
}

export function uodateFile(fid:string,title?:string,content?:string) {
    let body = {
        title:title || '',
        content:content || ''
    }
    return fetch(`/file/${fid}`,'PUT',body)
}
