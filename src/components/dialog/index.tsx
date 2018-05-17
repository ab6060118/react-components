import * as React from 'react'
import WindowContainer, { WindowProps } from '../window_container'
import Button from '../button'

import './stylt.scss'

interface DialogProps extends WindowProps{
  level:DIALOG_LEVEL
  handleCloseClick:any
  handleOkClick:Function
  handleNoClick:Function
  showOkButton?:boolean
  noText?:string
  okText?:string
}

export const enum DIALOG_LEVEL {
  INFO = 1,
  WARNING,
  HELP,
  ERROR,
}

export default class Dialog extends React.Component <DialogProps> {
  getIconClass(level:DIALOG_LEVEL) {
    switch(level) {
      case DIALOG_LEVEL.INFO:
        return 'dialog-icon-info'
      case DIALOG_LEVEL.WARNING:
        return 'dialog-icon-warning'
      case DIALOG_LEVEL.HELP:
        return 'dialog-icon-help'
      case DIALOG_LEVEL.ERROR:
        return 'dialog-icon-error'
    }
  }

  render() {
    let { 
      level,
      okText,
      noText,
      children,
      handleCloseClick,
      handleOkClick,
      handleNoClick,
      showOkButton,
      handleTopClick,
      winId,
    } = this.props

    console.log('rerender');
    return (
      <WindowContainer
        winId={winId}
        minWidth={340}
        minHeight={200}
        maxWidth={540}
        maxHeight={300}
        handleTopClick={handleTopClick}
        handleMoveClass="dialog-header">
        <div className="dialog">
          <div className="dialog-header">
            <div className="dialog-tool-icon-group">
              <span className="dialog-icon-close" onClick={handleCloseClick}></span>
            </div>
          </div>
          <div className="dialog-body">
            <div className="dialog-icon-container">
              <span className={this.getIconClass(level)}></span>
            </div>
            <div className="dialog-content">
            { children }
            </div>
          </div>
          <div className="dialog-footer">
            <div className="button-group">
            {showOkButton !== false &&
              <Button handleClick={handleOkClick} text={okText || 'Ok'} disabled={false} />
            }
              <Button handleClick={handleNoClick} text={noText || 'No'} disabled={false} />
            </div>
          </div>
        </div>
      </WindowContainer>
    )
  }
}
