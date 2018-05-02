import * as React from 'react'

interface TableHeaderColProps {
  index?:number
  width?:number
  resizable?:boolean
  updateWidths?:Function
}

const findAncestor = (el:HTMLElement, cls:string):HTMLElement => {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
}

export default class TableHeaderCol extends React.Component<TableHeaderColProps> {
  refs:{[key:string]:HTMLElement}
  mouseDownPosition:number
  originLeftWidth:number
  originRightWidth:number
  resizeLine:HTMLElement
  tableLeft:number
  minWidth:number = 50

  constructor(props:TableHeaderColProps) {
    super(props)

    this.handleResizerMouseDown = this.handleResizerMouseDown.bind(this)
    this.handleResizerDrag = this.handleResizerDrag.bind(this)
    this.handleResizerMouseUp = this.handleResizerMouseUp.bind(this)
  }

  componentDidMount() {
    this.tableLeft = findAncestor(this.refs.col, 'table').getBoundingClientRect().left
    this.resizeLine = findAncestor(this.refs.col, 'table-header').querySelector('.table-resize-line')
  }

  componentWillUnmount(){
    this.removeMouseListener()
  }

  handleResizerMouseDown(e:React.MouseEvent<HTMLDivElement>) {
    let { col } = this.refs
    let { resizeLine, tableLeft } = this

    resizeLine.style.display = 'inline-block'
    resizeLine.style.left = e.clientX - tableLeft + 'px'

    this.mouseDownPosition = e.clientX
    this.originLeftWidth = col.offsetWidth
    this.originRightWidth = col.nextElementSibling.getBoundingClientRect().width

    document.addEventListener('mousemove', this.handleResizerDrag)
    document.addEventListener('mouseup', this.handleResizerMouseUp)
  }

  handleResizerMouseUp(e:MouseEvent) {
    let { index, updateWidths } = this.props
    let { resizeLine, mouseDownPosition, originLeftWidth, originRightWidth, minWidth } = this

    let twoColWidth:number = originLeftWidth + originRightWidth

    let newWidthLeft:number
    let newWidthRight:number

    resizeLine.style.display = 'none'

    newWidthLeft = originLeftWidth + e.clientX - mouseDownPosition

    if(newWidthLeft + minWidth > twoColWidth) {
      newWidthLeft = twoColWidth - minWidth
    }
    if(newWidthLeft < minWidth) {
      newWidthLeft = minWidth
    }

    newWidthRight = twoColWidth - newWidthLeft

    updateWidths(index, newWidthLeft, newWidthRight)

    this.removeMouseListener()
  }

  handleResizerDrag(e:MouseEvent) {
    let { resizeLine, mouseDownPosition, originLeftWidth, originRightWidth, tableLeft } = this
    let minWidth = 30
    let resizeLineLeft:number

    if(e.clientX > mouseDownPosition + originRightWidth - minWidth) {
      resizeLineLeft = mouseDownPosition + originRightWidth - minWidth
    }
    else if(e.clientX < mouseDownPosition - originLeftWidth + minWidth) {
      resizeLineLeft = mouseDownPosition - originLeftWidth + minWidth
    }
    else {
      resizeLineLeft = e.clientX
    }

    resizeLine.style.left = resizeLineLeft - tableLeft + 'px'
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
