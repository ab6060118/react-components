import * as React from 'react'
import Scrollbar from './scrollbar/scrollbar'
import Table from './table/table'

interface ExampleState {
  element:number[]
  head:string[]
  tableData:{
    name:string,
    method:string,
    recipient:string[]
  }[]
}

export default class Example extends React.Component<any,ExampleState> {
  constructor(props:any) {
    super(props)
    this.state = {
      element: [4,5,6,1,2,3,4,5,6,1,2,3,4,5,6],
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
        { name: 'a', method: 'sms', recipient: ['1','2','3','4'] },
        { name: 'a', method: 'sms', recipient: ['1','2','3','4'] },
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

  handleAddClick() {
    this.setState({
      element: [...this.state.element, +new Date()]
    })
  }

  handleRemoveClick() {
    let result = [...this.state.element]

    result.shift()

    this.setState({
      element: result
    })
  }

  render() {
    let { head, tableData } = this.state
    let headSpanStyle:React.CSSProperties = {
      display: 'inline-block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: '100%',
      padding: '0 10px',
    }

    return (
      <div style={{padding: '30px'}}>
        <Table
          widths={[
            { init: '25%', max: 300, min: 100},
            { init: '25%', max: 300, min: 100},
            { init: '25%', max: 300, min: 100},
            { init: '25%', max: 300, min: 100},
          ]}
          className='good'
          resizable={ true }
          headElements={ head.map( str => <span style={headSpanStyle}>{ str }</span> ) } 
          bodyElements={ tableData.map( ( item, index ) => [
            <span key={ 'name-' + index } style={headSpanStyle}>{ item.name }</span>,
            <span key={ 'method-' + index } style={headSpanStyle}>{ item.method }</span>,
            <div key={ 'recipient-' + index }>
            {
              item.recipient.map( ( str, index ) => (
                <span key={ 'recipient-' + index }>{ str }</span> 
              ))
            }
            </div>,
            <span key={ 'name-' + index + '-' + index }>{ item.name }</span>,
          ] ) }/>
        <div style={{ marginTop: '30px' }}>
          <button onClick={this.handleAddClick.bind(this)}>Add</button>
          <button onClick={this.handleRemoveClick.bind(this)}>Delete</button>
        </div>
        <div>
          {this.state.element.map((e,index:number) => <div key={index}>{e}</div>)}
        </div>
      </div>
    )
  }
}
