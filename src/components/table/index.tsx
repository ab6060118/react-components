import * as React from 'react'
import Scrollbar from '../scrollbar'
import './style.scss'

interface TableProps {
  resizable:boolean
  bodyMaxHeight?:number
  headerElements:JSX.Element[]
  bodyRowElements:BodyRowElement[]
  stopWheelEventOnTableBody?:boolean
  widths:{
    default:number|string
    min:number
  }[]
  bodyRowHeight?:{
    init:number|string
    max?:number|string
  }
  className?:string
  selectable?:boolean
}

interface BodyRowElement {
  id:any
  selectable?:boolean
  rightClickAble?:boolean
  elements:JSX.Element[]
}

interface TableState {
  widths:(number|string)[]
  selected:any[]
}

enum ROW_TYPE {
  HEADER,
  BODY,
}

export default class Table extends React.Component<TableProps, TableState> {
  refs:{[key:string]:HTMLElement}
  mouseDownPosition:number
  originLeftWidth:number
  resizingColIndex:number
  lastSelectedRowIndex:number

  constructor(props:TableProps) {
    super(props)

    this.state = {
      widths: props.widths.map( width => width.default ),
      selected: []
    }

    this.handleResizerDrag = this.handleResizerDrag.bind(this)
    this.handleResizerMouseUp = this.handleResizerMouseUp.bind(this)
    this.handleWindowResize = this.handleWindowResize.bind(this)
    this.handleBodyRowClick = this.handleBodyRowClick.bind(this)
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

  handleBodyRowClick(id:any, index:number) {
    return function(e:React.MouseEvent<HTMLElement>) {
      let newSelected:any[] = [...this.state.selected]
      let { bodyRowElements, selectable } = this.props
      let rowElements:BodyRowElement[] = bodyRowElements.filter((rowElement:BodyRowElement) => rowElement.id === id)

      if(rowElements.length === 0) return
      if(selectable === false || rowElements[0].selectable === false) return

      if(e.ctrlKey === true) {
        if(newSelected.indexOf(id) < 0) {
          newSelected.push(id)
        }
        else {
          newSelected = newSelected.filter((selected:any) => selected !== id)
        }
      }
      else if(e.shiftKey === true) {
        if(index > this.lastSelectedRowIndex) {
          newSelected = bodyRowElements.slice(this.lastSelectedRowIndex, index + 1).map((e:any) => e.id)
        }
        else {
          newSelected = bodyRowElements.slice(index, this.lastSelectedRowIndex + 1).map((e:any) => e.id)
        }
      }
      else {
        newSelected = [id]
      }

      if(e.shiftKey !== true) {
        this.lastSelectedRowIndex = index
      }

      this.setState({
        selected: newSelected
      })
    }.bind(this)
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

  getBodyRowClassName(id:any) {
    let className:string[] = ["table-body-row"]
    let { selected } = this.state

    if(selected.indexOf(id) > -1) className.push('selected')

    return className.join(' ')
  }

  convertPercentageToPx() {
    let result:number[]

    result = Object.keys( this.refs ).filter( key => key.indexOf('table-header-col') > -1 ).map( key => this.refs[key].offsetWidth - 1 )

    this.setState({ widths: result })
  }

  render() {
    let { headerElements, bodyRowElements, className, resizable, bodyMaxHeight, stopWheelEventOnTableBody } = this.props
    let widths:React.CSSProperties[] = this.getWidthStyle();

    console.log(this.lastSelectedRowIndex, this.state.selected);

    return (
      <div className={ ['table', className].join(' ') } ref='table'>
        <div className="table-header">
          <div className="table-header-row">
          {
            headerElements.map(
              ( element, index, elements ) => (
                <div 
                  className="table-header-col"
                  style={ widths[index] }
                  key={ 'table-header-col' + '-' + index }
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
          <Scrollbar stopWheelEventWhenMouseOver={ stopWheelEventOnTableBody === true }>
          { 
            bodyRowElements.map( ( rowElement, indexRow ) => ( 
              <div 
                className={this.getBodyRowClassName(rowElement.id)}
                key={ 'table-body-row' + '-' + indexRow }
                onClick={this.handleBodyRowClick(rowElement.id, indexRow)}>
              {
                rowElement.elements.map( ( element, indexCol, elements )=> (
                  <div
                    className="table-body-col"
                    style={ widths[indexCol] }
                    key={ 'table-body-col' + '-' + indexRow + '-' + indexCol }>
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
