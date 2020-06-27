import * as React from 'react'
import { Card, Steps, Divider } from 'antd'
import { IInitialInfo } from 'apis/common'
import ClubForm from './ClubForm'
import UserForm from './UserForm'
import InitSys from './InitSys'

import style from './index.m.css'

const { Step } = Steps

interface IInitialState extends IInitialInfo {
  activeStep: number
}

export default class Initial extends React.Component<any, IInitialState> {
  state = {
    activeStep: 0,
    club: { clubName: '' },
    user: { staffId: '', password: '' }
  }

  handleClubSubmit = (club: IInitialInfo['club']) => {
    this.setState({ activeStep: 1, club })
  }

  handleUserPrev = () => {
    this.setState({ activeStep: 0 })
  }
  handleUserSubmit = (user: IInitialInfo['user']) => {
    this.setState({ activeStep: 2, user })
  }

  handleInitPrev = () => {
    this.setState({ activeStep: 1 })
  }

  render() {
    const { activeStep, club, user } = this.state
    return (
      <div className={style.root}>
        <Card className={style.card}>
          <Steps current={activeStep}>
            <Step title="创建社团" />
            <Step title="创建用户" />
            <Step title="初始化系统" />
          </Steps>
          <Divider />
          <div className={style.content}>
            <ClubForm
              className={activeStep === 0 ? undefined : style.hide}
              onSubmit={this.handleClubSubmit}
            />
            <UserForm
              className={activeStep === 1 ? undefined : style.hide}
              onPrev={this.handleUserPrev}
              onSubmit={this.handleUserSubmit}
            />
            <InitSys
              className={activeStep === 2 ? undefined : style.hide}
              isActive={activeStep === 2}
              info={{ club, user }}
              onPrev={this.handleInitPrev}
            />
          </div>
        </Card>
      </div>
    )
  }
}
