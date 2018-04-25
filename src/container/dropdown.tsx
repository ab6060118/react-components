import * as React from 'react'
import Dropdown from '../components/dropdown'

interface DropdownContainerState {
  dropdownValue:any
  dropdownItems:{text:any, value:any}[]
}

export default class DropdownContainer extends React.Component<any, DropdownContainerState> {
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
    }
  }

  render() {
    let { dropdownValue, dropdownItems } = this.state
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

    return (
      <Dropdown 
        labelElement={ <div><span>{'dropdown'}</span></div> }
        handleUpdate={ (value:any) => { this.setState({ dropdownValue: value }) } }
        id={'dropdown'}
        multiMode={true}
        valueElement={ <span>{dropdownValue}</span> }
        options={[
          ...dropdownItems.map( item => ({ 
            value:item.value,
            element: (
              <div style={{display: 'flex', alignItems: 'center'} as React.CSSProperties}>
              <span className="function-info-icon"></span>
              <span style={itemStyle}>{item.text}</span>
              </div> 
            )
          })),
          { 
            value:2,
            element: <div style={dividerContainerStyle} onClick={ () => { this.setState({ dropdownItems: [...this.state.dropdownItems, { value: +new Date(), text: +new Date() }] }) } }><div style={dividerStyle}></div></div>,
            selectAble: false
          }
        ]} />
    )
  }
}
