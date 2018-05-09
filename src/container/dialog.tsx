import * as React from "react";
import Dialog, { DIALOG_LEVEL } from '../components/dialog';

export default class DialogContainer extends React.Component<any> {
  render() {
    return (
      <Dialog
        level={DIALOG_LEVEL.INFO}
        handleOkClick={()=>{}}
        handleNoClick={()=>{}}
        handleCloseClick={()=>{}}>
        {'Info Dialog'}
      </Dialog>
    )
  }
}
