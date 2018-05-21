import * as React from 'react'
import WindowContainer from '../window_container'
import Button from '../button'

import './stylt.scss'

interface DialogProps {
  level:DIALOG_LEVEL
  handleOkClick:React.MouseEventHandler<HTMLElement>
  handleNoClick:React.MouseEventHandler<HTMLElement>
  handleCloseClick:React.MouseEventHandler<HTMLElement>
  handleTopClick:React.MouseEventHandler<HTMLElement>
  handleMinRestoreClick:React.MouseEventHandler<HTMLElement>
  isMined:boolean
  minOrder:number
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
    console.log('dialog');
    let { 
      level,
      okText,
      noText,
      isMined,
      children,
      minOrder,
      showOkButton,
      handleOkClick,
      handleNoClick,
      handleTopClick,
      handleCloseClick,
      handleMinRestoreClick,
    } = this.props

    return (
      <WindowContainer
        minWidth={340}
        minHeight={200}
        maxWidth={540}
        maxHeight={300}
        isMined={isMined}
        minOrder={minOrder}
        handleMinRestoreClick={handleMinRestoreClick}
        handleTopClick={handleTopClick}
        handleMoveClass="dialog-header">
        <div className="dialog">
          <div className="dialog-header">
            <div className="dialog-tool-icon-group">
              <span style={{display: 'inline-block', width: 10, height: 10, marginRight: 10}} onClick={handleMinRestoreClick} onMouseDown={()=>{console.log(`min down `)}} onMouseUp={()=>{console.log('min up')}}>{'-'}</span>
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
      </WindowContainer>
    )
  }
}
