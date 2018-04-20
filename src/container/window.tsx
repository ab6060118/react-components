import * as React from "react";
import WindowContainer from '../components/window_container';

export default class Window extends React.Component<any> {
  render() {
    return (
      <WindowContainer
        handleMoveClass="window-header"
        resizable={false}
        minWidth={200}
        minHeight={300}
        maxWidth={300}
        maxHeight={400}>
        <div className="example-window">
          <div className="window-header">
            <span>{'Test'}</span>
          </div>
          <div className="windowb-body"></div>
        </div>
      </WindowContainer>
    )
  }
}
