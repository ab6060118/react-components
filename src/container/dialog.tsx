import * as React from "react";
import Dialog, { DIALOG_LEVEL } from '../components/dialog';

export default class DialogContainer extends React.Component<any> {
  componentWillUpdate(nextProps:any) {
    console.log(this.props, nextProps);
  }

  render() {
    return (
      <Dialog
        handleTopClick={this.props.handleTopClick}
        level={DIALOG_LEVEL.INFO}
        handleOkClick={()=>{}}
        handleNoClick={()=>{}}
        handleCloseClick={()=>{}}>
        {'Info Dialog'}
      </Dialog>
    )
  }
}
