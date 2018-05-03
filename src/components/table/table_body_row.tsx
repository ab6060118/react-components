import * as React from 'react'

interface TableBodyRowProps {
  id?:any
  isSelected?:boolean
  selectable?:boolean
  widths?:number[]
  onClick?:(e:React.MouseEvent<HTMLElement>) => void
  onContextMenu?:(e:React.MouseEvent<HTMLElement>) => void
}

export default class TableBodyRow extends React.Component<TableBodyRowProps> {
  getClassName() {
    let { isSelected } = this.props
    let className:string[] = ['table-body-row']

    if(isSelected === true) className.push('selected')

    return className.join(' ')
  }

  render() {
    let { children, onClick, onContextMenu, widths } = this.props
    return (
      <div className={this.getClassName()} onClick={onClick} onContextMenu={onContextMenu}>
      {
        React.Children.map(children, (child, index) => {
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
