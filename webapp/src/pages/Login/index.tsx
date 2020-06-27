import * as React from 'react'
import Input from 'components/Input'
import style from './index.m.css'
import login from 'apis/login'
import userIcon from 'img/user.svg'
import passwordIcon from 'img/password.svg'
import { withRouter } from 'react-router'
import { message, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface ILoginState {
  isLoading: boolean
  staffId: string
  password: string
}

class Login extends React.Component<any, ILoginState> {
  constructor(props: any) {
    super(props)
    this.state = {
      isLoading: false,
      staffId: '',
      password: ''
    }
  }

  handleClick = (event: any) => {
    // = 放在实例上
    event.preventDefault()
    this.setState({ isLoading: true })
    login(this.state.staffId, this.state.password)
      .then(res => {
        if (res.message == '登录成功！') {
          this.props.history.push('/workspace')
        }
        message.success(res.message)
        this.setState({ isLoading: false })
      })
      .catch(err => {
        message.error(err.message)
        this.setState({ isLoading: false })
      })
  }

  updateUser(event: React.ChangeEvent<HTMLInputElement>) {
    //放在原型上
    this.setState({ staffId: event.target.value })
  }

  updatePassword(event: React.ChangeEvent<HTMLInputElement>) {
    //bind会每次都返回新函数
    this.setState({ password: event.target.value })
  }

  render() {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    return (
      <div className={style.container}>
        <Input
          prefix={userIcon}
          className="hasBack"
          placeholder="用户名"
          onChange={this.updateUser.bind(this)}
          type="text"
          value={this.state.staffId}
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
          {this.state.isLoading ? (
            <Spin className={style.loading} indicator={antIcon} />
          ) : (
            '登 录'
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
