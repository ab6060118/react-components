import * as React from "react";

import Example from './components/example'
import Scrollbar from './components/scrollbar/scrollbar';

export default class App extends React.Component<any, any> {
  render() {
    return (
      <div style={{maxHeight: '600px'}}>
        <Scrollbar>
          <Example />
        </Scrollbar>
      </div>
    )
  }
}
