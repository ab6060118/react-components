import * as React from "react";

import Example from './components/example'
import Scrollbar from './components/scrollbar/scrollbar';

export default class App extends React.Component<any, any> {
  render() {
    return (
      <div className="app">
        <div className="app-header">123</div>
        <div className="app-body">
          <div className="app-body-sidebar"></div>
          <div className="app-body-content">
            <Scrollbar>
              <Example />
            </Scrollbar>
          </div>
        </div>
      </div>
    )
  }
}
