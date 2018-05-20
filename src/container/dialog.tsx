import * as React from "react";
import { connect, Dispatch } from 'react-redux';

import Dialog, { DIALOG_LEVEL } from '../components/dialog';
import { minRestoreWindow, topWindow, closeWindow } from '../actions/windows';
import { State } from '../reducers/store_type'

class DialogContainer extends React.PureComponent<any,any> {
  constructor(props:any) {
    super(props)

    this.handleMinRestoreClick = this.handleMinRestoreClick.bind(this)
    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleTopClick = this.handleTopClick.bind(this)
    this.handleOkClick = this.handleOkClick.bind(this)
    this.handleNoClick = this.handleNoClick.bind(this)
  }

  handleMinRestoreClick(e:React.MouseEvent<HTMLElement>) {
    let { minRestoreWindow, winId } = this.props

    if(minRestoreWindow !== undefined) {
      minRestoreWindow(winId)
    }
  }

  handleTopClick(e:React.MouseEvent<HTMLElement>) {
    let { topWindow, winId } = this.props

    if(topWindow !== undefined) {
      topWindow(winId)
    }
  }

  handleCloseClick(e:React.MouseEvent<HTMLElement>) {
    let { closeWindow, winId } = this.props

    if(closeWindow !== undefined) {
      closeWindow(winId)
    }
  }

  handleOkClick(e:React.MouseEvent<HTMLElement>) {
    console.log('ok');
  }

  handleNoClick(e:React.MouseEvent<HTMLElement>){
    console.log('no');
  }

  render() {
    let { isMined, minOrder } = this.props

    return (
      <Dialog
        isMined={isMined}
        minOrder={minOrder}
        level={DIALOG_LEVEL.INFO}
        handleOkClick={this.handleOkClick}
        handleNoClick={this.handleNoClick}
        handleTopClick={this.handleTopClick}
        handleMinRestoreClick={this.handleMinRestoreClick}
        handleCloseClick={this.handleCloseClick}>
        {'Info Dialog ' + this.props.winId + ' ' + this.props.metadata}
      </Dialog>
    )
  }
}

const mapStateToProps = (state:State, ownProps:any) => ({
  ...ownProps,
})

const mapDispatchToProps = (dispatch:Dispatch) => ({
  topWindow: (id:string) => dispatch(topWindow(id)),
  closeWindow: (id:string) => dispatch(closeWindow(id)),
  minRestoreWindow: (id:string) => dispatch(minRestoreWindow(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DialogContainer)
