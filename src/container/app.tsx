import * as React from "react";
import Dialog from './dialog'

import Example from './example'
import Scrollbar from '../components/scrollbar';

export default class App extends React.Component<any, any> {
  componentWillMount() {
    document.addEventListener('wheel', (e) => {
      document.querySelector('.app-body-sidebar').textContent = ('Wheel ' + (e.deltaY < 0 ? 'up' : 'down'))
    })

    document.addEventListener('click', (e) => {
    })

    document.addEventListener('keyup', (e) => {
      let { keyCode } = e
      let result

      if(keyCode === 33) result = 'page up'
      if(keyCode === 34) result = 'page down'
      if(keyCode === 35) result = 'end'
      if(keyCode === 36) result = 'home'
      if(keyCode === 38) result = 'up'
      if(keyCode === 40) result = 'down'

      document.querySelector('.app-body-sidebar').textContent = result
    })

    window.addEventListener('resize', () => {
      document.querySelector('.app-body-sidebar').textContent = 'Resize'
    })

    document.addEventListener('contextmenu', event => event.preventDefault());
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">123</div>
        <div className="app-body">
          <div className="app-body-sidebar" style={{fontSize: '24px', color: 'red'}}></div>
          <div className="app-body-content">
            <div className="app-body-content-tabbar"></div>
            <div style={{flexGrow: 1, height: '1px'}}>
              <Scrollbar stopWheelEventWhenMouseOver={false}>
                <Example />
              </Scrollbar>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
