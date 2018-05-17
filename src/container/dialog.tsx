import * as React from "react";
import Dialog, { DIALOG_LEVEL } from '../components/dialog';

export default class DialogContainer extends React.PureComponent<any> {
  componentDidUpdate(n:any) {
    console.log('container');

    console.log(n, this.props);
  }

  render() {
    return (
      <Dialog
        handleTopClick={this.props.handleTopClick}
        winId={this.props.winId}
        metadata={this.props.metadata}
        level={DIALOG_LEVEL.INFO}
        handleOkClick={()=>{}}
        handleNoClick={()=>{}}
        handleCloseClick={()=>{}}>
        {'Info Dialog ' + this.props.winId + ' ' + this.props.metadata.tt}
      </Dialog>
    )
  }
}
