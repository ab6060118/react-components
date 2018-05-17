import * as React from "react";
import './style.scss'

enum SIDES {
  TOP = 1 << 0,
  RIGHT = 1 << 1,
  BOTTOM = 1 << 2,
  LEFT = 1 << 3,
}

export interface WindowProps {
  winId:string
  isMined?:boolean
  metadata?:any
  handleTopClick?:Function
  handleMinRestoreClick?:Function
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

interface WindowContainerProps extends WindowProps {
  handleMoveClass:string
  minWidth:number
  minHeight:number
  maxWidth:number
  maxHeight:number
  resizable?:boolean
  relativeToParent?:boolean
}

export default class WindowContainer extends React.PureComponent <WindowContainerProps, WindowContainerState> {
  refs: {[key:string]:HTMLElement}

  constructor(props:any) {
    super(props)

    this.state = {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
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
    this.handleTopClick = this.handleTopClick.bind(this)
  }

  componentDidMount() {
    this.initContainerPosition()
  }

  componentDidUpdate(prevProps:WindowContainerProps) {
    let { isMined, handleMoveClass } = this.props

    if(prevProps.isMined === true && isMined === false) {
      this.refs.container.querySelector('.' + handleMoveClass).addEventListener('mousedown', this.handleMovingDown)
    }
  }

  componentWillUnmount() {
    (this.refs.container as HTMLElement).querySelector('.' + this.props.handleMoveClass).removeEventListener('mousedown', this.handleMovingDown)

    document.removeEventListener('mouseup', this.handleMovingUp)
    document.removeEventListener('mouseup', this.handleResizeUp)
    document.removeEventListener('mousemove', this.handleContainerMoving)
    document.removeEventListener('mousemove', this.handleResizeMove)
  }

  handleTopClick() {
    let { handleTopClick, winId, isMined } = this.props

    if(isMined !== true && handleTopClick !== undefined) {
      handleTopClick(winId)
    }
  }

  handleMovingDown(e:MouseEvent) {
    let { isMined } = this.props

    if (e.button !== 0 || isMined === true) return

    let { left, top, width, height } = this.state

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
    let { top, left, mouseDownPos, mouseDownWindowPos } = this.state
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

  handleResizeDown(resizeSide: SIDES, e:React.MouseEvent<HTMLElement>) {
    let { resizable,  isMined } = this.props

    if(resizable === false || isMined === true) return

    let { left, top, width, height } = this.state

    this.setState({
      isResizing: true,
      resizeSide: resizeSide,
      mouseDownPos: { x: e.pageX, y: e.pageY },
      mouseDownWindowPos: { x: left, y: top, w: width, h: height }
    })

    document.addEventListener('mouseup', this.handleResizeUp)
    document.addEventListener('mousemove', this.handleResizeMove)
  }

  handleResizeUp() {
    if(this.props.resizable === false || this.state.isResizing === false) return

    this.setState({
      isResizing: false,
    })

    document.removeEventListener('mouseup', this.handleResizeUp)
    document.removeEventListener('mousemove', this.handleResizeMove)
  }

  handleResizeMove(e:MouseEvent) {
    if(this.state.isResizing === false) return

    let { width, height, top, left, resizeSide, mouseDownPos, mouseDownWindowPos } = this.state
    let { minWidth, maxWidth, minHeight, maxHeight } = this.props
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

    let { handleMoveClass, relativeToParent } = this.props
    let { container } = this.refs
    let { offsetHeight:height, offsetWidth:width } = container
    let parentHeight:number = undefined
    let parentWidth:number = undefined

    if(relativeToParent === true) {
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

    if(this.props.handleMoveClass) {
      container.querySelector('.' + handleMoveClass).addEventListener('mousedown', this.handleMovingDown)
    }

    this.setState({
      width: width,
      height: height,
      top: resultTop,
      left: resultLeft,
    })
  }

  render() {
    let { top, left, width, height } = this.state
    let { resizable, minWidth, maxWidth, minHeight, maxHeight, children, handleTopClick, handleMinRestoreClick, relativeToParent, isMined } = this.props
    let containerStyle:React.CSSProperties = {
      position:  relativeToParent === true ? 'absolute' : 'fixed',
      top:       top,
      left:      left,
      width:     width || 'unset',
      height:    height || 'unset',
      minWidth:  minWidth,
      minHeight: minHeight,
      maxWidth:  maxWidth,
      maxHeight: maxHeight,
    }

    return (
      <div
        className={`window-container ${isMined === true ? 'minimized' : ''}`}
        style={isMined === true ? {} : containerStyle}
         onMouseDown={this.handleTopClick}
        ref='container'>
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-top" onMouseDown={this.handleResizeDown.bind(this, SIDES.TOP)}></div>
        }
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-bottom" onMouseDown={this.handleResizeDown.bind(this, SIDES.BOTTOM)}></div>
        }
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-left" onMouseDown={this.handleResizeDown.bind(this, SIDES.LEFT)}></div>
        }
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-right" onMouseDown={this.handleResizeDown.bind(this, SIDES.RIGHT)}></div>
        }
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-top-right" onMouseDown={this.handleResizeDown.bind(this, SIDES.TOP|SIDES.RIGHT)}></div>
        }
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-bottom-right" onMouseDown={this.handleResizeDown.bind(this, SIDES.BOTTOM|SIDES.RIGHT)}></div>
        }
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-bottom-left" onMouseDown={this.handleResizeDown.bind(this, SIDES.BOTTOM|SIDES.LEFT)}></div>
        }
        {(resizable !== false &&  isMined !== true) &&
        <div className="window-container-resizer-top-left" onMouseDown={this.handleResizeDown.bind(this, SIDES.TOP|SIDES.LEFT)}></div>
        }
        {isMined !== true ?
          (children) : (
            <span onClick={handleMinRestoreClick as any}>{'+'}</span>
          )
        }
      </div>
    )
  }
}
