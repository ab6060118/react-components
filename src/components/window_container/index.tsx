import * as React from "react";
import './style.scss'

enum SIDES {
  TOP = 1 << 0,
  RIGHT = 1 << 1,
  BOTTOM = 1 << 2,
  LEFT = 1 << 3,
}

interface WindowContainerState {
  top: number
  left: number
  width: number
  height: number
  isMoving: boolean
  isResizing: boolean
  resizeSide: SIDES
  mouseDownPos: { x:number, y: number }
  mouseDownWindowPos: { x:number, y: number, h:number, w:number }
}

interface WindowContainerProps {
  minWidth:number
  minHeight:number
  maxWidth:number
  maxHeight:number
  handleTopClick:React.MouseEventHandler<HTMLElement>
  handleMinRestoreClick:React.MouseEventHandler<HTMLElement>
  handleCloseClick:React.MouseEventHandler<HTMLElement>
  isMined:boolean
  order:number
  minOrder:number
  title?:string
  resizable?:boolean
  relativeToParent?:boolean
}

export default class WindowContainer extends React.PureComponent <WindowContainerProps, WindowContainerState> {
  refs: {[key:string]:HTMLElement}

  constructor(props:any) {
    super(props)

    this.state = {
      top: undefined,
      left: undefined,
      width: undefined,
      height: undefined,
      isMoving: false,
      isResizing: false,
      resizeSide: undefined,
      mouseDownPos: { x: 0, y: 0 },
      mouseDownWindowPos: { x: 0, y: 0, w: 0, h: 0 }
    }

    this.handleMovingDown = this.handleMovingDown.bind(this)
    this.handleMovingUp = this.handleMovingUp.bind(this)
    this.handleContainerMoving = this.handleContainerMoving.bind(this)
    this.handleResizeUp = this.handleResizeUp.bind(this)
    this.handleResizeMove = this.handleResizeMove.bind(this)
    this.handleResizeDown = this.handleResizeDown.bind(this)
  }

  componentDidMount() {
    this.initContainerPosition()
  }

  componentDidUpdate(prevProps:WindowContainerProps) {
    let { isMined } = this.props

    if(prevProps.isMined === true && isMined === false) {
      let moveElement = this.refs.container.querySelector('.move-area')

      if(moveElement) {
        moveElement.addEventListener('mousedown', this.handleMovingDown)
      }
    }
  }

  componentWillUnmount() {
    if(!this.props.isMined) {
      let moveElement = this.refs.container.querySelector('.move-area')

      if(moveElement) {
        moveElement.addEventListener('mousedown', this.handleMovingDown)
      }
    }

    document.removeEventListener('mouseup', this.handleMovingUp)
    document.removeEventListener('mouseup', this.handleResizeUp)
    document.removeEventListener('mousemove', this.handleContainerMoving)
    document.removeEventListener('mousemove', this.handleResizeMove)
  }

  handleMovingDown(e:MouseEvent) {
    let { isMined } = this.props

    if (e.button !== 0 || isMined === true) return

    let { left, top, width, height } = this.refs.container.getBoundingClientRect()

    this.setState({
      isMoving: true,
      mouseDownPos: { x: e.pageX, y: e.pageY },
      mouseDownWindowPos: { x: left, y: top, w: width, h: height }
    })

    document.addEventListener('mousemove', this.handleContainerMoving)
    document.addEventListener('mouseup', this.handleMovingUp)
  }

  handleMovingUp(e:MouseEvent) {
    this.setState({isMoving: false})

    document.removeEventListener('mousemove', this.handleContainerMoving)
    document.removeEventListener('mouseup', this.handleMovingUp)
  }

  handleContainerMoving(e:MouseEvent) {
    let { mouseDownPos, mouseDownWindowPos } = this.state
    let { top, left } = this.refs.container.getBoundingClientRect()
    let moveX = e.pageX - mouseDownPos.x
    let moveY = e.pageY - mouseDownPos.y
    let resultLeft =  mouseDownWindowPos.x + moveX
    let resultTop =  mouseDownWindowPos.y + moveY

    if(resultLeft < 0) {
      resultLeft = 0
    }
    if(resultTop < 0) {
      resultTop = 0
    }

    if(top === resultTop && left === resultLeft) return

    this.setState({
      left: resultLeft,
      top: resultTop,
    })
  }

  handleResizeDown(e:React.MouseEvent<HTMLElement>) {
    let { resizable,  isMined } = this.props
    let resizeSide = parseInt(e.currentTarget.dataset.side)

    if(resizable === false || isMined === true) return

    let { left, top, width, height } = this.refs.container.getBoundingClientRect()

    this.setState({
      isResizing: true,
      resizeSide: resizeSide,
      mouseDownPos: { x: e.pageX, y: e.pageY },
      mouseDownWindowPos: { x: left, y: top, w: width, h: height }
    })

    document.addEventListener('mouseup', this.handleResizeUp)
    document.addEventListener('mousemove', this.handleResizeMove)
  }

  handleResizeUp(e:MouseEvent) {
    if(this.props.resizable === false || this.state.isResizing === false) return

    this.setState({
      isResizing: false,
    })

    document.removeEventListener('mouseup', this.handleResizeUp)
    document.removeEventListener('mousemove', this.handleResizeMove)
  }

  handleResizeMove(e:MouseEvent) {
    if(this.state.isResizing === false) return

    let { resizeSide, mouseDownPos, mouseDownWindowPos } = this.state
    let { minWidth, maxWidth, minHeight, maxHeight } = this.props
    let { width, height, top, left } = this.refs.container.getBoundingClientRect()
    let newTop:number    = top
    let newLeft:number   = left
    let newWidth:number  = width
    let newHeight:number = height

    if(resizeSide & SIDES.BOTTOM) newHeight = mouseDownWindowPos.h + e.pageY - mouseDownPos.y
    if(resizeSide & SIDES.RIGHT) newWidth = mouseDownWindowPos.w + e.pageX - mouseDownPos.x

    if(resizeSide & SIDES.TOP) {
      newTop = mouseDownWindowPos.y + e.pageY - mouseDownPos.y

      if(newTop >=  0) newHeight = mouseDownWindowPos.h - e.pageY + mouseDownPos.y
      if(newHeight > maxHeight) newTop = mouseDownWindowPos.y - maxHeight + mouseDownWindowPos.h
      if(newHeight < minHeight) newTop = mouseDownWindowPos.y + mouseDownWindowPos.h - minHeight
    }

    if(resizeSide & SIDES.LEFT) {
      newLeft = mouseDownWindowPos.x + e.pageX - mouseDownPos.x

      if(newLeft >= 0) newWidth = mouseDownWindowPos.w - e.pageX + mouseDownPos.x
      if(newWidth > maxWidth) newLeft = mouseDownWindowPos.x - maxWidth + mouseDownWindowPos.w
      if(newWidth < minWidth) newLeft = mouseDownWindowPos.x + mouseDownWindowPos.w - minWidth
    }

    if(newHeight > maxHeight) newHeight = maxHeight
    if(newHeight < minHeight) newHeight = minHeight
    if(newWidth > maxWidth) newWidth = maxWidth
    if(newWidth < minWidth) newWidth = minWidth
    if(newTop < 0) newTop = 0
    if(newLeft < 0) newLeft = 0

    if(width === newWidth && height === newHeight) return

    this.setState({
      top: newTop,
      left: newLeft,
      width: newWidth,
      height: newHeight
    })
  }

  initContainerPosition() {
    if(!this.refs.container) return ;

    let { relativeToParent } = this.props
    let { container } = this.refs
    let { offsetHeight:height, offsetWidth:width } = container
    let parentHeight:number = undefined
    let parentWidth:number = undefined
    let moveElement = this.refs.container.querySelector('.move-area')

    if(relativeToParent) {
      let parentElement = container.parentElement
      parentHeight = parentElement.offsetHeight
      parentWidth = parentElement.offsetWidth
    }
    else {
      let parentElement = window
      parentHeight = parentElement.innerHeight
      parentWidth = parentElement.innerWidth
    }

    let resultTop = (parentHeight - height) / 2
    let resultLeft = (parentWidth - width) / 2  

    if(resultLeft < 0) {
      resultLeft = 0
    }
    if(resultTop < 0) {
      resultTop = 0
    }

    if(moveElement) {
      moveElement.addEventListener('mousedown', this.handleMovingDown)
    }

    this.setState({
      // width: width ,
      // height: height,
      top: resultTop,
      left: resultLeft,
    })
  }

  render() {
    let { top, left, width, height, isResizing, isMoving } = this.state
    let { resizable, minWidth, maxWidth, minHeight, maxHeight, children, handleTopClick, handleMinRestoreClick, handleCloseClick, relativeToParent, isMined, minOrder, title, order } = this.props
    let containerStyle:React.CSSProperties = {
      position:  relativeToParent ? 'absolute' : 'fixed',
      top:       top,
      left:      left,
      width:     width,
      height:    height,
      minWidth:  minWidth,
      minHeight: minHeight,
      maxWidth:  maxWidth,
      maxHeight: maxHeight,
      zIndex: order,
    }

    if(isMoving || isResizing) containerStyle.transition = 'initial'

    return (
      <div
        className={`window-container ${isMined === true ? 'minimized' : ''}`}
        style={isMined === true ? { top: `calc(100vh - ${30*(minOrder + 1)}px)`} : containerStyle}
        onMouseDown={handleTopClick}
        ref='container'>
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-top" data-side={SIDES.TOP} onMouseDown={this.handleResizeDown}></div>
        }
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-bottom" data-side={SIDES.BOTTOM} onMouseDown={this.handleResizeDown}></div>
        }
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-left" data-side={SIDES.LEFT} onMouseDown={this.handleResizeDown}></div>
        }
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-right" data-side={SIDES.RIGHT} onMouseDown={this.handleResizeDown}></div>
        }
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-top-right" data-side={SIDES.TOP|SIDES.RIGHT} onMouseDown={this.handleResizeDown}></div>
        }
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-bottom-right" data-side={SIDES.BOTTOM|SIDES.RIGHT} onMouseDown={this.handleResizeDown}></div>
        }
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-bottom-left" data-side={SIDES.BOTTOM|SIDES.LEFT} onMouseDown={this.handleResizeDown}></div>
        }
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-top-left" data-side={SIDES.TOP|SIDES.LEFT} onMouseDown={this.handleResizeDown}></div>
        }
        {isMined !== true ?
          (children) : (
            <React.Fragment>
              <div className="window-container-minimized-left">
                <span className="window-tool-icon-minimized"></span>
              </div>
              <div className="window-container-minimized-center">
                <span>{title}</span>
              </div>
              <div className="window-container-minimized-right">
                <span className="window-tool-icon-max" onClick={handleMinRestoreClick}></span>
                <span className="window-tool-icon-close" onClick={handleCloseClick}></span>
              </div>
            </React.Fragment>
          )
        }
      </div>
    )
  }
}
