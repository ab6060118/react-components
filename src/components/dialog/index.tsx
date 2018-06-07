import * as React from 'react'
import WindowContainer from '../window_container'
import Button from '../button'

import './stylt.scss'

interface DialogProps {
  level:DIALOG_LEVEL
  handleOkClick:React.MouseEventHandler<HTMLElement>
  handleNoClick:React.MouseEventHandler<HTMLElement>
  handleCloseClick:React.MouseEventHandler<HTMLElement>
  handleMinRestoreClick:React.MouseEventHandler<HTMLElement>
  noText?:string
  okText?:string
  showOkButton?:boolean
}

export const enum DIALOG_LEVEL {
  INFO = 1,
  WARNING,
  HELP,
  ERROR,
}

export default class Dialog extends React.PureComponent <DialogProps> {
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
      showOkButton,
      handleOkClick,
      handleNoClick,
      handleCloseClick,
      handleMinRestoreClick,
    } = this.props

    return (
      <div className="dialog">
        <div className="dialog-header move-area">
          <div className="dialog-tool-icon-group">
            <span className="window-tool-icon-min" onClick={handleMinRestoreClick}></span>
            <span className="window-tool-icon-close" onClick={handleCloseClick}></span>
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
            <Button handleClick={handleOkClick} disabled={true}>
              {okText || 'Ok'}
            </Button>
          }
            <Button handleClick={handleNoClick} disabled={false}>
              {noText || 'No'}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
