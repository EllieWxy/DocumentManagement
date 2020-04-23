const config = require('../../../config.js')
const url = config.baseUrl

export default function postApi(path:string,body:any) {
    let requestUrl = url + path;
    if(body){
        body = JSON.stringify(body)
    } else {
        body = {}
    }
    return fetch(requestUrl,{
        headers : {
            'Content-Type': 'application/json'
        },
        method:'POST',
        body:body
    }).then(res => {
        return res.text()
    })
}
