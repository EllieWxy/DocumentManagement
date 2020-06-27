import * as React from 'react'
import { Spin, Result, Button } from 'antd'
import { IInitialInfo, initialSystem } from 'apis/common'

import style from './style.m.css'

interface IInitSysProps {
  className?: string
  info?: IInitialInfo
  isActive?: boolean
  onPrev?: () => void
}

interface IInitSysState {
  loading: boolean
  error: string
}

export default class InitSys extends React.Component<
  IInitSysProps,
  IInitSysState
> {
  state = {
    loading: false,
    error: ''
  }

  startInit = async (info: IInitialInfo) => {
    this.setState({ loading: true })
    try {
      await initialSystem(info)
      this.setState({ error: '' })
    } catch (e) {
      this.setState({ error: e.message })
    }

    this.setState({ loading: false })
  }

  handleRetry = () => {
    const { info } = this.props
    if (info) {
      this.startInit(info)
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  componentWillReceiveProps(nextProps: IInitSysProps) {
    if (!this.props.isActive && nextProps.isActive) {
      this.startInit(nextProps.info)
    }
  }

  renderContent() {
    const { info, onPrev } = this.props
    const { loading, error } = this.state
    if (loading) {
      return (
        <div className={style.loading}>
          <Spin spinning />
        </div>
      )
    }

    if (error) {
      return (
        <Result
          status="warning"
          title="系统初始化失败"
          subTitle={error}
          extra={
            <>
              <Button key="back" onClick={onPrev}>
                返回上一步
              </Button>
              {info && (
                <Button type="primary" key="retry" onClick={this.handleRetry}>
                  重试
                </Button>
              )}
            </>
          }
        />
      )
    }

    return (
      <Result
        status="success"
        title="系统初始化成功"
        extra={
          <Button type="primary" key="start" onClick={this.handleReload}>
            开始使用
          </Button>
        }
      />
    )
  }

  render() {
    const { className } = this.props
    const rootCls = [style.root]
    if (className) {
      rootCls.push(className)
    }

    return <div className={rootCls.join(' ')}>{this.renderContent()}</div>
  }
}
