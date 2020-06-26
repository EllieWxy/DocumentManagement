import * as React from 'react'
import { Form, Input, Button } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { IInitialInfo } from 'apis/common'

import style from './style.m.css'

const { Item } = Form
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}
const userNameRule = [{ required: true, message: '用户名为必填项' }]
const passwordRule = [{ required: true, message: '密码为必填项' }]

interface IUserFormProps {
  className?: string
  onPrev?: () => void
  onSubmit?: (value: IInitialInfo['user']) => void
}

export default class UserForm extends React.Component<IUserFormProps, any> {
  formRef = React.createRef<FormInstance>()

  render() {
    const { className, onPrev, onSubmit } = this.props
    return (
      <div className={className}>
        <Form {...layout} ref={this.formRef} onFinish={onSubmit}>
          <Item name="username" label="用户名" rules={userNameRule}>
            <Input />
          </Item>
          <Item name="password" label="密码" rules={passwordRule}>
            <Input.Password />
          </Item>
          <Form.Item {...tailLayout}>
            <Button className={style.prev} onClick={onPrev}>
              上一步
            </Button>
            <Button type="primary" htmlType="submit">
              下一步
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
