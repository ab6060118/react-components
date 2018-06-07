import * as React from "react";
import { connect, Dispatch } from 'react-redux';

import Dialog, { DIALOG_LEVEL } from '../components/dialog';
import { updateMetadata } from '../actions/windows';
import { State } from '../reducers/store_type'
import { withWindowContainer } from "../hocs/withWindowContainer";

class DialogContainer extends React.PureComponent<any,any> {
  constructor(props:any) {
    super(props)

    this.handleOkClick = this.handleOkClick.bind(this)
    this.handleNoClick = this.handleNoClick.bind(this)
  }

  handleOkClick(e:React.MouseEvent<HTMLElement>) {
    console.log('ok');
  }

  handleNoClick(e:React.MouseEvent<HTMLElement>){
    console.log('no');
  }

  render() {
    let { handleCloseClick, handleMinRestoreClick } = this.props

    return (
      <Dialog
        level={DIALOG_LEVEL.INFO}
        handleOkClick={this.handleOkClick}
        handleNoClick={handleCloseClick}
        handleMinRestoreClick={handleMinRestoreClick}
        handleCloseClick={handleCloseClick}>
        {'Info Dialog ' + this.props.winId + ' ' + this.props.metadata}
      </Dialog>
    )
  }
}

const mapStateToProps = (state:State, ownProps:any) => ({
  ...ownProps,
})

const mapDispatchToProps = (dispatch:any) => ({
  updateMetadata: (id:string, key:string, value:any) => dispatch(updateMetadata(id, key, value))
})

export default withWindowContainer(connect(mapStateToProps, mapDispatchToProps)(DialogContainer))
