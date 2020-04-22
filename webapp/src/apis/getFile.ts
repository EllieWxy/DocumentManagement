const config = require('../../../config.js')
const url = config.baseUrl

export default function getFiles(fid?:string) {
    let requestUrl = url + '/file/getFiles';
    if(fid){
        requestUrl = requestUrl + '?father=' + fid
    }
    return fetch(requestUrl,{
        method:'GET'
    }).then(res => {
        return res.json()
    })
}
