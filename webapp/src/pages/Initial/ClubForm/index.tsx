import * as React from 'react'
import { Form, Input, Button } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { IInitialInfo } from 'apis/common'

const { Item } = Form
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}
const clubNameRule = [{ required: true, message: '社团名称为必填项' }]

interface IClubFormProps {
  className?: string
  onSubmit?: (value: IInitialInfo['club']) => void
}

export default class ClubForm extends React.Component<IClubFormProps, any> {
  formRef = React.createRef<FormInstance>()

  render() {
    const { className, onSubmit } = this.props
    return (
      <div className={className}>
        <Form {...layout} ref={this.formRef} onFinish={onSubmit}>
          <Item name="clubName" label="社团名称" rules={clubNameRule}>
            <Input />
          </Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              下一步
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
