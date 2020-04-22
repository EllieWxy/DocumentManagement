import getApi from './getApi'

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
