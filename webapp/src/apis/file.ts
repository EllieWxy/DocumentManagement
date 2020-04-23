import getApi from './getApi'
import postApi from './postApi'

export function getFileDetail(fid:string) {
    return getApi('/file/getFileDetail',{fid:fid})
}

export function getAllFiles(fid?:string) {
    let params = {}
    if(fid){
        params = {fid:fid}
    }
    return getApi('/file/getAllFiles',params)
}

export function saveFile(fid:string,title?:string,content?:string) {
    let body = {
        fid:fid,
        title:title || '',
        content:content || ''
    }
    return postApi('/file/saveFile',body)
}
