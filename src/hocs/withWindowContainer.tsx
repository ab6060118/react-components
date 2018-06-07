import * as React from "react";
import { connect, Dispatch } from 'react-redux';

import { minRestoreWindow, topWindow, closeWindow } from '../actions/windows';
import { State } from '../reducers/store_type'
import WindowContainer from "../components/window_container";

export const withWindowContainer = (WrapComponet:any) => {
  const mapStateToProps = (state:State, ownProps:any) => ({
    ...ownProps,
  })

  const mapDispatchToProps = (dispatch:any) => ({
    topWindow: (id:string) => dispatch(topWindow(id)),
    closeWindow: (id:string) => dispatch(closeWindow(id)),
    minRestoreWindow: (id:string) => dispatch(minRestoreWindow(id)),
  })

  return connect(mapStateToProps, mapDispatchToProps)(
    class extends React.PureComponent<any,any> {
      constructor(props:any) {
        super(props)

        this.handleMinRestoreClick = this.handleMinRestoreClick.bind(this)
        this.handleCloseClick = this.handleCloseClick.bind(this)
        this.handleTopClick = this.handleTopClick.bind(this)
      }

      handleMinRestoreClick(e:React.MouseEvent<HTMLElement>) {
        let { minRestoreWindow, winId } = this.props

        minRestoreWindow(winId)
      }

      handleTopClick(e:React.MouseEvent<HTMLElement>) {
        let { topWindow, winId } = this.props

        topWindow(winId)
      }

      handleCloseClick(e:React.MouseEvent<HTMLElement>) {
        let { closeWindow, winId } = this.props

        closeWindow(winId)
      }

      render() {
        let { isMined, minOrder, winId, order, metadata, minWidth, minHeight, maxWidth, maxHeight, title, resizable } = this.props

        return (
          <WindowContainer
            title={title}
            minWidth={minWidth}
            minHeight={minHeight}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            resizable={resizable}
            isMined={isMined}
            order={order}
            minOrder={minOrder}
            handleTopClick={this.handleTopClick}
            handleMinRestoreClick={this.handleMinRestoreClick}
            handleCloseClick={this.handleCloseClick}>
            <WrapComponet
              metadata={metadata}
              handleTopClick={this.handleTopClick}
              handleMinRestoreClick={this.handleMinRestoreClick}
              handleCloseClick={this.handleCloseClick}/>
          </WindowContainer>
        )
      }
    }
  )
}
