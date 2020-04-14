const config = require('../../config.js')
const url = config.baseUrl;

export default function login(user:string,password:string) :Promise<Response> {
    return fetch(url + '/common/login',{
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            user : user,
            password : password
        }),
        method : 'POST'
    }).then(res => {
        return res.json()
    })
}
