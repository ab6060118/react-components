import * as React from 'react'
import Scrollbar from '../scrollbar/scrollbar'
import './table.scss'

interface TableProps {
  className?:string
  resizable:boolean
  bodyMaxHeight?:number
  headElements:JSX.Element[]
  bodyElements:JSX.Element[][]
  widths:{
    init:number|string
    min?:number
    max?:number
  }[]
  bodyRowHeight?:{
    init:number|string
    max?:number|string
  }
}

interface TableState {
  widths:(number|string)[]
}

export default class Table extends React.Component<TableProps, TableState> {
  refs:{[key:string]:HTMLElement}
  mouseDownPosition:number
  resizingColIndex:number

  constructor(props:TableProps) {
    super(props)

    this.state = {
      widths: props.widths.map( width => width.init )
    }

    this.handleResizerDrag = this.handleResizerDrag.bind(this)
    this.handleResizerMouseUp = this.handleResizerMouseUp.bind(this)
    this.handleWindowResize = this.handleWindowResize.bind(this)
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentDidMount() {
    this.convertPercentageToPx()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  handleWindowResize() {
    this.setState({
      widths: this.props.widths.map( width => width.init )
    }, () => { this.convertPercentageToPx() })
  }

  handleResizerMouseDown(index:number) {
    return function(e:React.MouseEvent<HTMLElement>) {
      let tableLeft = this.refs.table.getBoundingClientRect().left


      this.resizingColIndex = index
      this.mouseDownPosition = e.clientX

      this.refs['resize-line'].style.visibility = 'visible'
      this.refs['resize-line'].style.left = e.clientX - tableLeft + 'px'

      document.addEventListener('mousemove', this.handleResizerDrag)
      document.addEventListener('mouseup', this.handleResizerMouseUp)
    }.bind(this)
  }

  handleResizerMouseUp(e:MouseEvent) {
    let { widths } = this.props
    let newWidths = [...this.state.widths]
    let index = this.resizingColIndex
    let towColWidth:number = ( newWidths[index] as number ) + ( newWidths[index + 1] as number ) 

    let newWidthLeft:number
    let newWidthRight:number
    let deltaX:number 

    console.log(towColWidth);

    this.refs['resize-line'].style.visibility = 'hidden'

    newWidthLeft = ( newWidths[index] as number ) + e.clientX - this.mouseDownPosition

    if(newWidthLeft > widths[index].max) newWidthLeft = widths[index].max
    if(newWidthLeft < widths[index].min) newWidthLeft = widths[index].min

    deltaX = newWidthLeft - ( newWidths[index] as number )

    newWidthRight = ( newWidths[index + 1] as number ) - deltaX

    if(newWidthRight > widths[index + 1].max) newWidthRight = widths[index + 1].max
    if(newWidthRight < widths[index + 1].min) newWidthRight = widths[index + 1].min

    newWidths[index] = newWidthLeft
    newWidths[index + 1] = newWidthRight

    this.setState({ widths: newWidths })

    document.removeEventListener('mousemove', this.handleResizerDrag)
    document.removeEventListener('mouseup', this.handleResizerMouseUp)
  }

  handleResizerDrag(e:MouseEvent) {
    let tableLeft = this.refs.table.getBoundingClientRect().left
    this.refs['resize-line'].style.left = e.clientX - tableLeft + 'px'
  }

  getWidthStyle() {
    let stateWidths = this.state.widths
    let propsWidths = this.props.widths

    return stateWidths.map( ( width, index ) => {
      let propsWidth = propsWidths[index]

      return {
        width: width,
        minWidth: propsWidth.min ? propsWidth.min : propsWidth.init,
        maxWidth: propsWidth.max ? propsWidth.max : propsWidth.init,
      }
    })
  }

  convertPercentageToPx() {
    let result:number[]

    result = Object.keys( this.refs ).filter( key => key.indexOf('table-header-col') > -1 ).map( key => this.refs[key].offsetWidth - 1 )

    this.setState({ widths: result })
  }

  render() {
    let { headElements, bodyElements, className, resizable, bodyMaxHeight } = this.props
    let timestamp = +new Date()
    let widths:React.CSSProperties[] = this.getWidthStyle();
    let lastColStyle:React.CSSProperties = {
      flexGrow: 1,
      flexShrink: 1,
    }

    console.log(this.state.widths);

    return (
      <div className={ ['table', className].join(' ') } ref='table'>
        <div className="table-resize-line" ref='resize-line'></div>
        <div className="table-header">
          <div className="table-header-row">
          {
            headElements.map(
              ( element, index, elements ) => (
                <div 
                  className="table-header-col"
                  style={ widths[index] }
                  key={ 'table-header-col' + timestamp + '-' + index }
                  ref={ 'table-header-col-' + index }>
                { element }
                { ( resizable && index !== elements.length - 1 ) &&
                  <div 
                    className="table-col-resizer"
                    onMouseDown={ this.handleResizerMouseDown.bind(this)(index) }></div>
                }
                </div> 
              )
            ) 
          }
          </div>
        </div>
        <div className="table-body">
          <Scrollbar>
          { 
            bodyElements.map( ( rowElements, indexRow ) => ( 
              <div className="table-body-row" key={ 'table-body-row' + timestamp + '-' + indexRow }>
              {
                rowElements.map( ( element, indexCol, elements )=> (
                  <div
                    className="table-body-col"
                    style={ widths[indexCol] }
                    key={ 'table-body-col' + timestamp + '-' + indexRow + '-' + indexCol }>
                  { element }
                  </div> 
                )) 
              } 
              </div>
            )) 
          }
          </Scrollbar>
        </div>
      </div>
    )
  }
}
