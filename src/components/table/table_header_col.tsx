import * as React from 'react'

interface TableHeaderColProps {
  index?:number
  width?:number
  widths?:number[]
  resizable?:boolean
  updateWidths?:Function
}

export default class TableHeaderCol extends React.Component<TableHeaderColProps> {
  refs:{[key:string]:HTMLElement}
  mouseDownPosition:number
  originLeftWidth:number
  originRightWidth:number
  resizeLine:HTMLElement

  constructor(props:TableHeaderColProps) {
    super(props)

    this.handleResizerMouseDown = this.handleResizerMouseDown.bind(this)
    this.handleResizerDrag = this.handleResizerDrag.bind(this)
    this.handleResizerMouseUp = this.handleResizerMouseUp.bind(this)
  }

  cdm() {
    this.resizeLine = this.refs.col.parentElement.parentElement.querySelector('.table-resize-line')
  }

  handleResizerMouseDown(e:React.MouseEvent<HTMLDivElement>) {
    let { index } = this.props
    let { col } = this.refs

    this.mouseDownPosition = e.clientX
    this.originLeftWidth = col.offsetWidth
    this.originRightWidth = col.nextElementSibling.getBoundingClientRect().width

    document.addEventListener('mousemove', this.handleResizerDrag)
    document.addEventListener('mouseup', this.handleResizerMouseUp)
  }

  handleResizerMouseUp() {
    this.removeMouseListener()
  }

  handleResizerDrag(e:MouseEvent) {
    let { widths, index, updateWidths } = this.props

    let twoColWidth:number = this.originLeftWidth + this.originRightWidth
    let resizeLine:HTMLElement = this.refs.col.parentElement.parentElement
    let minWidth = 30

    let newWidthLeft:number
    let newWidthRight:number

    newWidthLeft = this.originLeftWidth + e.clientX - this.mouseDownPosition

    if(newWidthLeft + minWidth > twoColWidth) {
      newWidthLeft = twoColWidth - minWidth
    }
    if(newWidthLeft < minWidth) newWidthLeft = minWidth

    newWidthRight = twoColWidth - newWidthLeft

    updateWidths(index, newWidthLeft, newWidthRight)
  }

  removeMouseListener() {
    document.removeEventListener('mousemove', this.handleResizerDrag)
    document.removeEventListener('mouseup', this.handleResizerMouseUp)
  }

  render() {
    let { children, width, resizable } = this.props
    return (
      <div className="table-col" style={{width: width}} ref='col'>
      { children }
      {resizable === true &&
        <div className="table-col-resizer" onMouseDown={ this.handleResizerMouseDown }></div>
      }
      </div> 
    )
  }
}
