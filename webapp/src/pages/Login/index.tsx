import * as React from 'react'
import Input from 'components/Input'
import './index.css'
import login from 'apis/login'

export default class Login extends React.Component<{login:any},{user:string,password:string}>{
    constructor(props:any) {
        super(props);
        this.state = {
            user:'',
            password:'',
        }
        this.handleClick= this.handleClick.bind(this);
    }

    handleClick = (event:any):void => {
        event.preventDefault();
        login(this.state.user,this.state.password).then(res => {
            alert(res.message)
            if(res.message == '登录成功'){
                this.props.login()
            }
        })
    }



    updateUser(event : React.ChangeEvent<HTMLInputElement>):void{
        this.setState({user: event.target.value});
    }

    updatePassword(event : React.ChangeEvent<HTMLInputElement>):void{
        this.setState({password: event.target.value});
    }

    render(){
        return <div className='container'>
            <Input icons='M504.951 511.98c93.49 0 169.28-74.002 169.28-165.26 0-91.276-75.79-165.248-169.28-165.248-93.486 0-169.287 73.972-169.279 165.248-0.001 91.258 75.793 165.26 169.28 165.26z m77.6 55.098H441.466c-120.767 0-218.678 95.564-218.678 213.45V794.3c0 48.183 97.911 48.229 218.678 48.229H582.55c120.754 0 218.66-1.78 218.66-48.229v-13.77c0-117.887-97.898-213.45-218.66-213.45z'
                   placeholder='用户名' changeValue={this.updateUser.bind(this)} type='text'/>
            <Input icons=
                       'M746.666667 373.333333h-39.637334V294.101333A198.186667 198.186667 0 0 0 509.013333 96a198.186667 198.186667 0 0 0-198.101333 198.101333V373.333333h-39.68A79.445333 79.445333 0 0 0 192 452.565333v353.493334a79.445333 79.445333 0 0 0 79.232 79.274666H746.666667a79.445333 79.445333 0 0 0 79.274666-79.232v-353.536A79.445333 79.445333 0 0 0 746.666667 373.333333z m-197.802667 307.712a29.269333 29.269333 0 0 1-29.098667 29.525334 29.269333 29.269333 0 0 1-29.098666-29.525334v-118.186666c0-16.341333 13.013333-29.525333 29.098666-29.525334 7.978667 0 15.274667 3.328 20.522667 8.661334 5.290667 5.376 8.533333 12.757333 8.533333 20.906666v118.144zM386.133333 373.333333V294.101333a122.88 122.88 0 0 1 122.837334-122.837333 122.88 122.88 0 0 1 122.794666 122.794667V373.333333H386.133333z'
                   placeholder='密码' changeValue={this.updatePassword.bind(this)} type='password'/>
            <div className='button' onClick={this.handleClick}>登 录</div>
        </div>
    }

}
