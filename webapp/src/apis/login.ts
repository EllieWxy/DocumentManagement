import fetch from './fetch'

export default function login(user:string,password:string) :Promise<any> {
    return fetch('/common/login','POST',{
            user : user,
            password : password,
    })
}
