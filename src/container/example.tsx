import * as React from 'react'
import Table from './table'
import Form from './from';
import Window from './windows_manager'
import { Route, Switch, Redirect } from 'react-router-dom';

interface ExampleState {
  element:number[]
}

export default class Example extends React.Component<any,ExampleState> {
  render() {
    return (
      <div className="example">
        <Switch>
          <Route exact path="/table" component={Table}/>
          <Route path="/form" component={Form}/>
          <Route path="/window" component={Window}/>
          <Redirect to="/table" />
        </Switch>
      </div>
    )
  }
}
