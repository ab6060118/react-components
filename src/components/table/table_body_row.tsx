import * as React from 'react'

interface TableBodyRowProps {
  id?:any
  index?:number
  isSelected?:boolean
  selectable?:boolean
  widths?:number[]
  onClick?:React.MouseEventHandler<HTMLElement>
  onContextMenu?:React.MouseEventHandler<HTMLElement>
}

export default class TableBodyRow extends React.PureComponent<TableBodyRowProps> {
  getClassName() {
    let { isSelected } = this.props
    let className:string[] = ['table-body-row']

    if(isSelected === true) className.push('selected')

    return className.join(' ')
  }

  render() {
    let { children, widths, index, id, onClick, onContextMenu } = this.props

    return (
      <div 
        className={this.getClassName()}
        onClick={onClick}
        onContextMenu={onContextMenu}
        data-index={index}
        data-id={id}>
      {
        React.Children.map(React.Children.toArray(children), (child, index) => {
          return React.cloneElement(React.Children.only(child), { 
            width: widths[index],
            index: index,
          })
        })
      }
      </div>
    )
  }
}
