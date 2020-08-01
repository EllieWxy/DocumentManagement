import * as React from 'react'
import { withRouter } from 'react-router'
import { message, Spin, Input} from 'antd'
import { LoadingOutlined,UserOutlined,LockOutlined} from '@ant-design/icons'
import login from 'apis/login'
import style from './index.m.css'

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

  handleClick = (event:any) => {
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
          <Input className={style.input} size="large" placeholder="用户名"
                 prefix={<UserOutlined />} onChange={this.updateUser.bind(this)}/>
          <Input className={style.input} size="large" placeholder="密码" type='password'
                 onPressEnter={this.handleClick.bind(this)}
                 prefix={<LockOutlined />} onChange={this.updatePassword.bind(this)} />
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
