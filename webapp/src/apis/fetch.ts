import config from '../../config';
const baseUrl = config.baseUrl;

export default function fetch(path:string,method?:string,body?:object) {
    let requestUrl = baseUrl + path;

    return window.fetch(requestUrl,{
        method:method || 'GET',
        headers : {
            'Content-Type': 'application/json'
        },
        body:body && JSON.stringify(body) //考虑传headers或其他参数的情况
    }).then(res => {
        if(res.ok){
            return res.json()
        } else {
            return res.text()
        }
    })
}
