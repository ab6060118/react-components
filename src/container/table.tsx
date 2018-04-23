import * as React from 'react'
import Table from '../components/table'
import Tooltip from '../components/tooltip'

class Span extends React.Component<any> {
  render() {
    console.log('span rerender');
    return (
      <span style={this.props.style}>ttt</span>
    )
  }
}

interface TableContainerState {
  head:string[]
  tableData:{
    name:string
    method:string
    recipient:string[]
  }[] 
}

export default class TableContainer extends React.PureComponent<any, TableContainerState> {
  constructor(props:any) {
    super(props)
    this.state = {
      head: ['name', 'delivery method', 'recipient', 'action'],
      tableData: [
        { name: 'a', method: 'sms', recipient: ['1','2','3','4'] },
        { name: 'a', method: 'sms', recipient: ['1','2','3','4'] },
        { name: 'a', method: 'sms', recipient: ['1','2','3','4'] },
        { name: 'a', method: 'sms', recipient: ['1','2','3','4'] },
        { name: 'a', method: 'sms', recipient: ['1','2','3','4'] },
        { name: 'a', method: 'sms', recipient: ['1','2','3','4'] },
        { name: 'a', method: 'sms', recipient: ['1','2','3','4'] },
        { name: 'a', method: 'sms', recipient: ['1','2','3','4'] },
      ]
    }
  }

  render () {
    let { tableData, head } = this.state
    let headSpanStyle:React.CSSProperties = {
      display: 'inline-block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: '100%',
      padding: '0 10px',
    }

    return (
      <Table
        bodyMaxHeight={ 200 }
        widths={[
          { default: '25%', min: 30},
          { default: '25%', min: 30},
          { default: '25%', min: 30},
          { default: '25%', min: 30},
        ]}
        className='example-table'
        resizable={ true }
        headElements={ head.map( str => (
          <Tooltip text={str}>
            <span style={headSpanStyle}>{ str }</span>
          </Tooltip> 
        ))} 
        bodyElements={ tableData.map( ( item, index ) => [
          <Span style={headSpanStyle}/>,
          <span style={headSpanStyle}>{ item.method }</span>,
          <div style={headSpanStyle}>{ item.recipient.join(',') }</div>,
          <span>{ item.name }</span>,
        ] ) }/>

    )
  }
}
