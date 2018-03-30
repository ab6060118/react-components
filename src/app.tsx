import * as React from "react";

import Example from './components/example'
import Scrollbar from './components/scrollbar/scrollbar';

export default class App extends React.Component<any, any> {
  render() {
    return (
        <Scrollbar maxHeight={400}>
          <Example />
        </Scrollbar>
    )
  }
}
