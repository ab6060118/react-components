import * as React from 'react'
import './style.scss'

interface ScrollbarProps {
  className?:string
  maxHeight?:number|string
  stopWheelEventWhenMouseOver?:boolean
}

interface ScrollbarState {
  trackAtTop:boolean
  trackAtBottom:boolean
}

enum BUTTON_TYPE {
  UP = 0,
  DOWND
}

export default class Scrollbar extends React.Component<ScrollbarProps, ScrollbarState> {
  refs:{[key:string]:HTMLElement}
  moveFirstClickYPoint:number
  originalScrollTop:number
  lastScrollHeight:number
  scrollHeightWatcher:any

  constructor(props:ScrollbarProps) {
    super(props)
    this.state = {
      trackAtTop: false,
      trackAtBottom: false
    }
    this.handleWindowResize = this.handleWindowResize.bind(this)
    this.handleMoveTrack = this.handleMoveTrack.bind(this)
    this.handleTrackMouseUp = this.handleTrackMouseUp.bind(this)
    this.scrollHeightWatch = this.scrollHeightWatch.bind(this)
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
    cancelAnimationFrame(this.scrollHeightWatcher)
  }

  componentDidMount() {
    this.updateScrollbar()
    this.scrollHeightWatcher = window.requestAnimationFrame(this.scrollHeightWatch);
  }

  componentDidUpdate(p:any, n:any) {
    this.updateScrollbar()
  }

  scrollHeightWatch() {
    let { content, bar } = this.refs

    cancelAnimationFrame(this.scrollHeightWatcher)

    if (this.lastScrollHeight !== content.scrollHeight) {
      this.updateScrollbar()
    }

    bar.style.top = content.scrollTop + 'px';

    this.lastScrollHeight = content.scrollHeight
    this.scrollHeightWatcher = requestAnimationFrame(this.scrollHeightWatch)
  }

  updateScrollbar() {
    let { content, track, bar } = this.refs
    let { trackAtTop, trackAtBottom } = this.state

    if(content.offsetHeight !== content.parentElement.offsetHeight)
      content.style.height = content.parentElement.offsetHeight + 'px'

    console.log(content.scrollTop, content.offsetHeight, content.scrollHeight);

    if(content.scrollHeight !== content.offsetHeight) {
      bar.style.display = 'flex'
      track.style.top = content.scrollTop / content.scrollHeight * 100 + '%'
      track.style.height = content.offsetHeight / content.scrollHeight * 100 + '%'
    }
    else {
      bar.style.display = 'none'
    }

    if(content.scrollTop === 0 && !trackAtTop) {
      this.setState({trackAtTop: true})
    }
    if(content.scrollTop !== 0 && trackAtTop) {
      this.setState({trackAtTop: false})
    }
    if(Math.floor(content.scrollTop + content.offsetHeight) >= ( content.scrollHeight - 1 ) && !trackAtBottom) {
      this.setState({trackAtBottom: true})
    }
    if(Math.floor(content.scrollTop + content.offsetHeight) < ( content.scrollHeight - 1 )&& trackAtBottom) {
      this.setState({trackAtBottom: false})
    }
  }

  handleWheelAndKeyup(e:React.WheelEvent<HTMLElement>|React.KeyboardEvent<HTMLElement>) {
    let { content, track } = this.refs
    let { trackAtTop, trackAtBottom } = this.state

    if(this.props.stopWheelEventWhenMouseOver !== false) {
      e.stopPropagation()
    }

    if(e.type === 'keydown') {
      let allowKey = [
        33, /* pageUp */
        34, /* pageDown */
        35, /* home */
        36, /* end */
        38, /* up */
        40, /* down */
      ]

      let { keyCode } = (e as React.KeyboardEvent<HTMLElement>)

      e.stopPropagation();

      if(allowKey.indexOf(keyCode) < 0) return

      if(keyCode === 33) content.scrollTop -= content.offsetHeight
      if(keyCode === 34) content.scrollTop += content.offsetHeight
      if(keyCode === 35) content.scrollTop = content.scrollHeight
      if(keyCode === 36) content.scrollTop = 0
      if(keyCode === 38) content.scrollTop -= 50
      if(keyCode === 40) content.scrollTop += 50
    }
    else {
      let { deltaY } = (e as React.WheelEvent<HTMLElement>)
      if(deltaY > 0) {
        content.scrollTop += 50
      }
      else {
        content.scrollTop -= 50
      }
    }


    if(content.scrollTop !== 0 && Math.floor(content.scrollTop + content.offsetHeight) < ( content.scrollHeight - 1 ))  {
      e.stopPropagation();
    }
  }

  handleScroll() {
    this.updateScrollbar()
  }

  handleWindowResize(e?:Event) {
    this.updateScrollbar()
  }

  handleBarBodyMouseDown(e:React.MouseEvent<HTMLElement>) {
    let { content, bar, track, bar_body } = this.refs
    let clickPoint:number
    let clickPointOfBar:number
    let interval:number

    e.stopPropagation()

    clickPoint = e.pageY
    clickPointOfBar = clickPoint - bar_body.getBoundingClientRect().top

    if(e.pageY < track.getBoundingClientRect().top) {
      interval = window.setInterval(() => {
        content.scrollTop -= 5
        if(track.offsetTop <= clickPointOfBar - track.offsetHeight / 2) {
          window.clearInterval(interval)
        }
      }, 10)
    }
    else {
      interval = window.setInterval(() => {
        content.scrollTop += 5
        if(track.offsetTop >= clickPointOfBar - track.offsetHeight / 2) {
          window.clearInterval(interval)
        }
      }, 10)
    }

    window.addEventListener('mouseup', (e) => {
      e.stopPropagation()
      window.clearInterval(interval)
    }, { once: true })
  }

  handleTrackMouseDown(e:React.MouseEvent<HTMLElement>) {
    let { content } = this.refs

    e.stopPropagation()

    this.moveFirstClickYPoint = e.clientY
    this.originalScrollTop = content.scrollTop

    window.addEventListener('mousemove', this.handleMoveTrack)
    window.addEventListener('mouseup', this.handleTrackMouseUp)
  }

  handleTrackMouseUp(e:MouseEvent) {
    e.stopPropagation()
    window.removeEventListener('mousemove', this.handleMoveTrack)
    window.removeEventListener('mouseup', this.handleTrackMouseUp)
  }

  handleMoveTrack(e:MouseEvent) {
    let { content, bar_body } = this.refs
    let delta = e.clientY - this.moveFirstClickYPoint 

    content.scrollTop = this.originalScrollTop + delta / bar_body.offsetHeight * content.scrollHeight
  }

  handleUpDownClick(type:BUTTON_TYPE) {
    return function(e:React.MouseEvent<HTMLElement>) {
      let { trackAtTop, trackAtBottom } = this.state
      let { content } = this.refs
      let interval:number

      e.stopPropagation()

      if(type === BUTTON_TYPE.UP && !trackAtTop) {
        interval = window.setInterval(() => {
          content.scrollTop -= 5
        }, 10)
      }
      if(type === BUTTON_TYPE.DOWND && !trackAtBottom) {
        interval = window.setInterval(() => {
          content.scrollTop += 5
        }, 10)
      }

      window.addEventListener('mouseup', (e) => {
        e.stopPropagation()
        window.clearInterval(interval)
      }, { once: true })
    }
  }

  getUpDownButtonClassName(type:BUTTON_TYPE) {
    let className:string[] = []
    let { trackAtTop, trackAtBottom } = this.state

    if(type === BUTTON_TYPE.UP) {
      className.push('scrollbar-bar-up')
      if(trackAtTop) className.push('disable')
    }
    else {
      className.push('scrollbar-bar-down')
      if(trackAtBottom) className.push('disable')
    }

    return className.join(' ')
  }

  render() {
    let { children, maxHeight, className } = this.props
    let scrollbarStyle = { maxHeight: maxHeight }

    return(
      <div className={["scrollbar", className].join(' ')} onWheel={this.handleWheelAndKeyup.bind(this)} onKeyDown={this.handleWheelAndKeyup.bind(this)} onScroll={this.handleScroll.bind(this)} tabIndex={0} ref='content' >
        <div className="scrollbar-content">
          { children }
        </div>
        <div className="scrollbar-bar" ref='bar'>
          <span
            className={this.getUpDownButtonClassName(BUTTON_TYPE.UP)}
            onMouseDown={this.handleUpDownClick(BUTTON_TYPE.UP).bind(this)}
            onClick={(e:React.MouseEvent<HTMLElement>) => { e.stopPropagation() }}></span>
          <div 
            className="scrollbar-bar-body"
            ref="bar_body"
            onMouseDown={this.handleBarBodyMouseDown.bind(this)}
            onClick={(e:React.MouseEvent<HTMLElement>) => { e.stopPropagation() }}>
            <div 
              className="scrollbar-bar-body-track"
              ref="track"
              onMouseDown={this.handleTrackMouseDown.bind(this)}
              onClick={(e:React.MouseEvent<HTMLElement>) => { e.stopPropagation() }}></div>
          </div>
          <span
            className={this.getUpDownButtonClassName(BUTTON_TYPE.DOWND)}
            onMouseDown={this.handleUpDownClick(BUTTON_TYPE.DOWND).bind(this)}
            onClick={(e:React.MouseEvent<HTMLElement>) => { e.stopPropagation() }}></span>
        </div>
      </div>
    )
  }
}
