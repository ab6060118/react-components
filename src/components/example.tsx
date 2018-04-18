import * as React from 'react'
import Scrollbar from './scrollbar/scrollbar'
import Dropdown from './dropdown/dropdown';
import FunctionInfo from './function_info/function_info';
import Table from './table/table'
import Example2 from './example1';

import './example.scss'

interface ExampleState {
  element:number[]
  head:string[]
  dropdownValue:any
  dropdownItems:{text:any, value:any}[]
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
      dropdownValue: 1,
      dropdownItems: [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 },
        { text: '6', value: 6 },
        { text: '7', value: 7 },
        { text: '8', value: 8 },
        { text: '9', value: 9 },
      ],
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
    let { head, tableData, dropdownValue, dropdownItems } = this.state
    let headSpanStyle:React.CSSProperties = {
      display: 'inline-block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: '100%',
      padding: '0 10px',
    }
    let itemStyle:React.CSSProperties = {
      paddingLeft: 10
    }
    let dividerContainerStyle:React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      padding: '0 10px',
      backgroundColor: '#ffffff',
    }
    let dividerStyle:React.CSSProperties = {
      borderBottom: '1px solid black',
      width: '100%',
    }
    let functionInfoElement = <span>{'Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test'}</span>

    return (
      <div style={{padding: '30px' }}>
        <FunctionInfo element={functionInfoElement}><span>{'Function Info TestFunction Info TestFunction Info TestFunction Info TestFunction Info TestFunction Info TestFunction Info TestFunction Info TestFunction Info Test'}</span></FunctionInfo>
        <Dropdown 
          labelElement={ <div><span>{'dropdown'}</span></div> }
          handleUpdate={ (value:any) => { this.setState({ dropdownValue: value }) } }
          id={'dropdown'}
          options={[
            ...dropdownItems.map( item => (
            { value:item.value, element: <span style={itemStyle}>{item.text}</span> }
            )),
            { 
              value:2,
              element: <div style={dividerContainerStyle} onClick={ () => { this.setState({ dropdownItems: [...this.state.dropdownItems, { value: +new Date(), text: +new Date() }] }) } }><div style={dividerStyle}></div></div>,
              selectAble: false
            }
          ]}
          value={ dropdownValue }/>
        <div style={{marginTop: '20px'}}></div>

        <Table
          bodyMaxHeight={ 200 }
          widths={[
            { default: '25%', min: 100},
            { default: '25%', min: 100},
            { default: '25%', min: 100},
            { default: '25%', min: 100},
          ]}
          className='example-table'
          resizable={ true }
          headElements={ head.map( str => <span style={headSpanStyle}>{ str }</span> ) } 
          bodyElements={ tableData.map( ( item, index ) => [
            <span key={ 'name-' + index } style={headSpanStyle}>{ item.name }</span>,
            <span key={ 'method-' + index } style={headSpanStyle}>{ item.method }</span>,
            <div key={ 'recipient-' + index } style={headSpanStyle}>{ item.recipient.join(',') }</div>,
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
