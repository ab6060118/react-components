import * as React from "react";
import { Link, withRouter } from 'react-router-dom';

import Example from './example'
import Scrollbar from '../components/scrollbar';

export default withRouter(class App extends React.Component<any, any> {
  componentWillMount() {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">{'React-components'}</div>
        <div className="app-body">
          <div className="app-body-sidebar" style={{fontSize: '24px', color: 'red'}}>
            <Link className="link" to="/table">{'Table'}</Link>
            <Link className="link" to="/form">{'Form'}</Link>
            <Link className="link" to="/window">{'Window'}</Link>
          </div>
          <div className="app-body-content">
            <Scrollbar>
              <Example />
            </Scrollbar>
          </div>
        </div>
      </div>
    )
  }
})
