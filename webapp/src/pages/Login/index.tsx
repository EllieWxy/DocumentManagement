import * as React from 'react'
import Input from 'components/Input'
import style from './index.css'
import login from 'apis/login'
import userIcon from "img/user.svg"
import passwordIcon from "img/password.svg"


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
            if(res.message == '登录成功！'){
                alert(res.message)
                this.props.login()
            } else {
                alert(res)
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
        return <div className={style.container}>
            <Input prefix={userIcon} class='hasBack'
                   placeholder='用户名' changeValue={this.updateUser.bind(this)} type='text'/>
            <Input prefix={passwordIcon} class='hasBack'
                   placeholder='密码' changeValue={this.updatePassword.bind(this)} type='password'/>
            <div className={style.button} onClick={this.handleClick}>登 录</div>
        </div>
    }

}
