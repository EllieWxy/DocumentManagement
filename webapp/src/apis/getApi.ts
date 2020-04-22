const config = require('../../../config.js')
const url = config.baseUrl

export default function getApi(path:string,params:any) {
    let requestUrl = url + path;
    for(var item in params){
        requestUrl = requestUrl + `?${item}=${params[item]}`
    }
    return fetch(requestUrl,{
        method:'GET'
    }).then(res => {
        return res.json()
    })
}
