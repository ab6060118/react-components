import * as React from 'react';

import './style.scss';

interface CarouselProps {
  showDots:boolean
}

interface CarouselState {
  width:number
  currentIndex:number
  totalIndexes:number
}

enum SWITCH_BUTTON_TYPE {
  PREVIOUS,
  NEXT,
}

const SwitchButtonAction:{[key:number]:number} = {
  [SWITCH_BUTTON_TYPE.PREVIOUS]: -1,
  [SWITCH_BUTTON_TYPE.NEXT]: 1,
}

export default class Carousel extends React.PureComponent<CarouselProps,CarouselState> {
  carousel:React.RefObject<HTMLDivElement> = React.createRef()
  track:React.RefObject<HTMLDivElement> = React.createRef()

  constructor(props:any) {
    super(props)

    this.state = {
      width: undefined,
      currentIndex: 0,
      totalIndexes: React.Children.count(props.children),
    }

    this.handleDotClick = this.handleDotClick.bind(this)
    this.handlGoIndex = this.handlGoIndex.bind(this)
    this.handleSwitchClick = this.handleSwitchClick.bind(this)
    this.handleWindowResize = this.handleWindowResize.bind(this)
    this.updateWidth = this.updateWidth.bind(this)
  }

  componentDidMount() {
    this.updateWidth()

    window.addEventListener('resize', this.handleWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  handleDotClick(e:React.MouseEvent<HTMLElement>) {
    let index = parseInt(e.currentTarget.dataset.index)

    this.handlGoIndex(index)
  }

  handlGoIndex(index:number) {
    let { totalIndexes } = this.state

    if(index >= totalIndexes) return;
    if(index < 0) return

    this.setState({
      currentIndex: index,
    })
  }

  handleSwitchClick(e:React.MouseEvent<HTMLElement>) {
    let type = parseInt(e.currentTarget.dataset.type)
    let { currentIndex } = this.state

    this.handlGoIndex(currentIndex + SwitchButtonAction[type])
  }

  handleWindowResize(e:Event) {
    this.updateWidth()
  }

  updateWidth() {
    let { totalIndexes } = this.state

    let parentElement:Element = this.carousel.current.parentElement
    let { width:paretnWidth } = parentElement.getBoundingClientRect()

    this.track.current.style.width = `${paretnWidth*totalIndexes}px`

    this.setState({
      width: paretnWidth,
    })
  }

  render() {
    let { totalIndexes, currentIndex, width } = this.state
    let { children } = this.props
    let dots:JSX.Element[] = []

    for(var i = 0; i < totalIndexes; i++) {
      dots.push(<span className={`carousel-dot ${i === currentIndex ? 'active' : ''}`} data-index={i} key={i} onClick={this.handleDotClick}>{i}</span>)
    }

    return (
      <div className="carousel" ref={this.carousel}>
        <div className="carousel-body">
          <div className="carousel-track" style={{transform: `translateX(${-width*currentIndex}px)`}} ref={this.track}>
            {
            React.Children.map(children, (child) => (
            <div className="carousel-container" style={{width:width}}>
              {child}
            </div>
            ))
            }
          </div>
        </div>
        <div className="carousel-footer">
          {dots}
        </div>
        {currentIndex > 0 &&
        <span className="carousel-switch-left" data-type={SWITCH_BUTTON_TYPE.PREVIOUS} onClick={this.handleSwitchClick}/>
        }
        {currentIndex < totalIndexes-1 &&
        <span className="carousel-switch-right" data-type={SWITCH_BUTTON_TYPE.NEXT} onClick={this.handleSwitchClick}/>
        }
      </div>
    )
  }
}
