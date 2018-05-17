import * as React from "react";
import Dialog, { DIALOG_LEVEL } from '../components/dialog';
import { WindowProps } from '../components/window_container';

export default class DialogContainer extends React.PureComponent<WindowProps> {
  constructor(props:WindowProps) {
    super(props)

    this.handleMinRestoreClick = this.handleMinRestoreClick.bind(this)
  }

  handleMinRestoreClick() {
    let { handleMinRestoreClick, winId } = this.props

    if(handleMinRestoreClick !== undefined) {
      handleMinRestoreClick(winId)
    }
  }

  render() {
    return (
      <Dialog
        {...this.props}
        handleMinRestoreClick={this.handleMinRestoreClick}
        level={DIALOG_LEVEL.INFO}
        handleOkClick={()=>{}}
        handleNoClick={()=>{}}
        handleCloseClick={()=>{}}>
        {'Info Dialog ' + this.props.winId + ' ' + this.props.metadata.tt}
      </Dialog>
    )
  }
}
