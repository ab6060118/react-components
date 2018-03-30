import * as React from 'react'
import './scrollbar.scss'

interface ScrollbarProps {
  maxHeight?:number|string
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
  }

  componentDidMount() {
    this.updateScrollbar()
    this.scrollHeightWatcher = window.requestAnimationFrame(this.scrollHeightWatch);
  }

  componentDidUpdate(p:any, n:any) {
    this.updateScrollbar()
  }

  scrollHeightWatch() {
    let { scrollbar } = this.refs

    cancelAnimationFrame(this.scrollHeightWatcher);

    if (this.lastScrollHeight !== scrollbar.scrollHeight) {
      this.updateScrollbar()
    }

    this.lastScrollHeight = scrollbar.scrollHeight;
    this.scrollHeightWatcher = requestAnimationFrame(this.scrollHeightWatch);
  }

  updateScrollbar() {
    let { scrollbar, track, bar } = this.refs
    let { trackAtTop, trackAtBottom } = this.state

    if(scrollbar.scrollHeight !== scrollbar.offsetHeight) {
      bar.style.display = 'flex'
      bar.style.top = scrollbar.scrollTop + 'px';
      track.style.top = scrollbar.scrollTop / scrollbar.scrollHeight * 100 + '%'
      track.style.height = scrollbar.offsetHeight / scrollbar.scrollHeight * 100 + '%'
    }
    else {
      bar.style.display = 'none'
    }

    if(scrollbar.scrollTop === 0 && !trackAtTop) {
      this.setState({trackAtTop: true})
    }
    if(scrollbar.scrollTop !== 0 && trackAtTop) {
      this.setState({trackAtTop: false})
    }
    if(scrollbar.scrollTop + scrollbar.offsetHeight === scrollbar.scrollHeight && !trackAtBottom) {
      this.setState({trackAtBottom: true})
    }
    if(scrollbar.scrollTop + scrollbar.offsetHeight !== scrollbar.scrollHeight && trackAtBottom) {
      this.setState({trackAtBottom: false})
    }
  }

  handleWheelAndKeyup(e:React.WheelEvent<HTMLElement>|React.KeyboardEvent<HTMLElement>) {
    let { scrollbar, track } = this.refs
    let { trackAtTop, trackAtBottom } = this.state

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

      if(keyCode === 33) scrollbar.scrollTop -= scrollbar.offsetHeight
      if(keyCode === 34) scrollbar.scrollTop += scrollbar.offsetHeight
      if(keyCode === 35) scrollbar.scrollTop = scrollbar.scrollHeight
      if(keyCode === 36) scrollbar.scrollTop = 0
      if(keyCode === 38) scrollbar.scrollTop -= 30
      if(keyCode === 40) scrollbar.scrollTop += 30
    }
    else {
      let { deltaY } = (e as React.WheelEvent<HTMLElement>)
      if(deltaY > 0) {
        scrollbar.scrollTop += 30
      }
      else {
        scrollbar.scrollTop -= 30
      }
    }

    if(scrollbar.scrollTop !== 0 && scrollbar.scrollTop + scrollbar.offsetHeight !== scrollbar.scrollHeight)  {
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
    let { scrollbar, bar, track, bar_body } = this.refs
    let clickPoint:number
    let clickPointOfBar:number
    let interval:number
    let barTop:number

    barTop = bar_body.getBoundingClientRect().top
    clickPoint = e.pageY
    clickPointOfBar = clickPoint - bar_body.getBoundingClientRect().top


    if(e.pageY < track.getBoundingClientRect().top) {
      interval = window.setInterval(() => {
        scrollbar.scrollTop -= 15
        if(track.offsetTop <= clickPointOfBar - track.offsetHeight / 2) {
          window.clearInterval(interval)
        }
      }, 10)
    }
    else {
      interval = window.setInterval(() => {
        scrollbar.scrollTop += 15
        if(track.offsetTop >= clickPointOfBar - track.offsetHeight / 2) {
          window.clearInterval(interval)
        }
      }, 10)
    }

    window.addEventListener('mouseup', () => {
      window.clearInterval(interval)
    }, { once: true })
  }

  handleTrackMouseDown(e:React.MouseEvent<HTMLElement>) {
    let { scrollbar } = this.refs

    e.stopPropagation()

    this.moveFirstClickYPoint = e.clientY
    this.originalScrollTop = scrollbar.scrollTop

    window.addEventListener('mousemove', this.handleMoveTrack)
    window.addEventListener('mouseup', this.handleTrackMouseUp)
  }

  handleTrackMouseUp(e:MouseEvent) {
    window.removeEventListener('mousemove', this.handleMoveTrack)
    window.removeEventListener('mouseup', this.handleTrackMouseUp)
  }

  handleMoveTrack(e:MouseEvent) {
    let { scrollbar, bar_body } = this.refs
    let delta = e.clientY - this.moveFirstClickYPoint 

    scrollbar.scrollTop = this.originalScrollTop + delta / bar_body.offsetHeight * scrollbar.scrollHeight
  }

  handleUpDownClick(type:BUTTON_TYPE) {
    return function() {
      let { trackAtTop, trackAtBottom } = this.state
      let { scrollbar } = this.refs
      let interval:number

      if(type === BUTTON_TYPE.UP && !trackAtTop) {
        interval = window.setInterval(() => {
          scrollbar.scrollTop -= 15
        }, 10)
      }
      if(type === BUTTON_TYPE.DOWND && !trackAtBottom) {
        interval = window.setInterval(() => {
          scrollbar.scrollTop += 15
        }, 10)
      }

      window.addEventListener('mouseup', () => {
        window.clearInterval(interval)
      }, { once: true })
    }
  }

  getUpDownButtonClassName(type:BUTTON_TYPE) {
    let className:string[] = []
    let { scrollbar } = this.refs
    let { trackAtTop, trackAtBottom } = this.state

    if(!scrollbar) return

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
    let { children, maxHeight } = this.props
    let scrollbarStyle = {
      maxHeight: maxHeight 
    }

    return(
      <div className="scrollbar" style={scrollbarStyle} onScroll={this.handleScroll.bind(this)} onWheel={this.handleWheelAndKeyup.bind(this)} onKeyDown={this.handleWheelAndKeyup.bind(this)} tabIndex={0} ref="scrollbar">
        <div className="scrollbar-content" ref='content'>
          { children }
        </div>
        <div className="scrollbar-bar" ref='bar'>
          <span
            className={this.getUpDownButtonClassName(BUTTON_TYPE.UP)}
            onMouseDown={this.handleUpDownClick(BUTTON_TYPE.UP).bind(this)}></span>
          <div className="scrollbar-bar-body" ref="bar_body" onMouseDown={this.handleBarBodyMouseDown.bind(this)}>
            <div 
              className="scrollbar-bar-body-track"
              ref="track"
              onMouseDown={this.handleTrackMouseDown.bind(this)} ></div>
          </div>
          <span
            className={this.getUpDownButtonClassName(BUTTON_TYPE.DOWND)}
            onMouseDown={this.handleUpDownClick(BUTTON_TYPE.DOWND).bind(this)}></span>
        </div>
      </div>
    )
  }
}
