import * as React from "react";
import Dialog, { DIALOG_LEVEL } from '../components/dialog';
import Table from './table';

export default class DialogContainer extends React.Component<any> {
  render() {
    return (
      <Dialog
        level={DIALOG_LEVEL.INFO}
        handleOkClick={()=>{}}
        handleNoClick={()=>{}}
        handleCloseClick={()=>{}}>
        <Table />
      </Dialog>
    )
  }
}
