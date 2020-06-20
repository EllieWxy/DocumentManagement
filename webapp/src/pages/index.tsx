import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import WorkSpace from './WorkSpace'
import Login from './Login'

export default function() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/workspace">
          <WorkSpace />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
