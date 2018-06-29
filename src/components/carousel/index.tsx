import * as React from 'react';

import './style.scss';

interface CarouselProps {
  showDots:boolean
  defaultIndex?:number
}

interface CarouselState {
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

  constructor(props:any) {
    super(props)

    this.state = {
      currentIndex: props.defaultIndex || 0,
      totalIndexes: React.Children.count(props.children),
    }

    this.handleDotClick = this.handleDotClick.bind(this)
    this.handlGoIndex = this.handlGoIndex.bind(this)
    this.handleSwitchClick = this.handleSwitchClick.bind(this)
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

  render() {
    let { totalIndexes, currentIndex } = this.state
    let { children } = this.props
    let dots:JSX.Element[] = []

    for(var i = 0; i < totalIndexes; i++) {
      dots.push(<div className={`carousel-dot ${i === currentIndex ? 'active' : ''}`} data-index={i} key={i} onClick={this.handleDotClick}/>)
    }

    return (
      <div className="carousel" ref={this.carousel}>
        <div className="carousel-body">
          <div className="carousel-track" style={{transform: `translateX(${-100*currentIndex}%)`}}>
            {
            React.Children.map(children, (child) => (
            <div className="carousel-container">
              {child}
            </div>
            ))
            }
          </div>
        </div>
        <div className="carousel-footer">
          {dots}
        </div>
        <span className={`carousel-switch-left ${currentIndex === 0 ? 'disabled' : ''}`} data-type={SWITCH_BUTTON_TYPE.PREVIOUS} onClick={this.handleSwitchClick}/>
        <span  className={`carousel-switch-right ${currentIndex === totalIndexes - 1 ? 'disabled' : ''}`} data-type={SWITCH_BUTTON_TYPE.NEXT} onClick={this.handleSwitchClick}/>
      </div>
    )
  }
}
