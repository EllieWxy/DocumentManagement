const config = require('../../../config.js')
const url = config.baseUrl

export default function fetch(path:string,method:string,body?:any):any {
    let requestUrl = url + path;

    return window.fetch(requestUrl,{
        method:method,
        headers : {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body) || undefined
    }).then(res => {
        if(res.ok){
            return res.json()
        } else {
            return res.text()
        }
    })
}
