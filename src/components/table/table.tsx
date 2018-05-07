import * as React from 'react'

interface TableProps {
  className?:string
}

interface TableState {
  widths:number[]
}

export default class Table extends React.Component<TableProps, TableState> {
  constructor(props:TableProps) {
    super(props)

    this.state = {
      widths: [],
    }

    this.updateWidths = this.updateWidths.bind(this)
    this.handleWindowResize = this.handleWindowResize.bind(this)
  }

  updateWidths(index:number, widthLeft:number, widthRight:number) {
    let newWidths = [...this.state.widths]

    newWidths[index] = widthLeft
    newWidths[index+1] = widthRight

    this.setState({
      widths: newWidths
    })
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  handleWindowResize() {
    this.setState({
      widths: []
    })
  }

  render() {
    let { className, children } = this.props
    let { widths } = this.state

    return (
      <div className={ ['table', className].join(' ') } ref='table'>
      {
        React.Children.map(children, (child, index) => {
          return React.cloneElement(React.Children.only(child), {
            updateWidths: this.updateWidths,
            widths: widths,
          })
        })
      }
      </div>
    )
  }
}
