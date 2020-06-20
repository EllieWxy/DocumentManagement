import * as React from 'react'
import Input from 'components/Input'
import style from './index.m.css'
import login from 'apis/login'
import userIcon from 'img/user.svg'
import passwordIcon from 'img/password.svg'

interface ILoginState {
  user: string
  password: string
}

export default class Login extends React.Component<any, ILoginState> {
  constructor(props: any) {
    super(props)
    this.state = {
      user: '',
      password: ''
    }
  }

  handleClick = (event: any) => {
    // = 放在实例上
    event.preventDefault()
    login(this.state.user, this.state.password).then(res => {
      if (res.message == '登录成功！') {
        alert(res.message)
        location.href = location.origin + '/workspace'
      } else {
        alert(res)
      }
    })
  }

  updateUser(event: React.ChangeEvent<HTMLInputElement>) {
    //放在原型上
    this.setState({ user: event.target.value })
  }

  updatePassword(event: React.ChangeEvent<HTMLInputElement>) {
    //bind会每次都返回新函数
    this.setState({ password: event.target.value })
  }

  render() {
    return (
      <div className={style.container}>
        <Input
          prefix={userIcon}
          className="hasBack"
          placeholder="用户名"
          onChange={this.updateUser.bind(this)}
          type="text"
          value={this.state.user}
        />
        <Input
          prefix={passwordIcon}
          className="hasBack"
          placeholder="密码"
          onChange={this.updatePassword.bind(this)}
          type="password"
          value={this.state.password}
        />
        <div className={style.button} onClick={this.handleClick}>
          登 录
        </div>
      </div>
    )
  }
}
