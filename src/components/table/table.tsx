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
    default:number|string
    min:number
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
  originLeftWidth:number
  resizingColIndex:number

  constructor(props:TableProps) {
    super(props)

    this.state = {
      widths: props.widths.map( width => width.default )
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
    this.removeMouseListener()
  }

  handleWindowResize() {
    this.setState({
      widths: this.props.widths.map( width => width.default )
    }, () => { this.convertPercentageToPx() })
  }

  handleResizerMouseDown(index:number) {
    return function(e:React.MouseEvent<HTMLElement>) {
      let tableLeft = this.refs.table.getBoundingClientRect().left

      this.resizingColIndex = index
      this.mouseDownPosition = e.clientX
      this.originLeftWidth = this.state.widths[index]

      document.addEventListener('mousemove', this.handleResizerDrag)
      document.addEventListener('mouseup', this.handleResizerMouseUp)
    }.bind(this)
  }

  handleResizerMouseUp() {
    this.removeMouseListener()
  }

  handleResizerDrag(e:MouseEvent) {
    let { widths } = this.props
    let originWidths = this.state.widths
    let newWidths = [...this.state.widths]
    let index = this.resizingColIndex
    let twoColWidth:number = ( originWidths[index] as number ) + ( originWidths[index + 1] as number ) 

    let newWidthLeft:number
    let newWidthRight:number

    newWidthLeft = this.originLeftWidth + e.clientX - this.mouseDownPosition

    if(newWidthLeft + ( widths[index + 1].min as number) > twoColWidth) {
      newWidthLeft = twoColWidth - widths[index + 1].min
    }
    if(newWidthLeft < widths[index].min) newWidthLeft = widths[index].min

    newWidthRight = twoColWidth - newWidthLeft

    newWidths[index] = newWidthLeft
    newWidths[index + 1] = newWidthRight

    this.setState({ widths: newWidths })
  }

  removeMouseListener() {
    document.removeEventListener('mousemove', this.handleResizerDrag)
    document.removeEventListener('mouseup', this.handleResizerMouseUp)
  }

  getWidthStyle() {
    let stateWidths = this.state.widths
    let propsWidths = this.props.widths

    return stateWidths.map( ( width, index ) => {
      return {
        width: width,
        minWidth: propsWidths[index].min,
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

    return (
      <div className={ ['table', className].join(' ') } ref='table'>
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
        <div className="table-body" style={{ maxHeight:bodyMaxHeight }}>
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
