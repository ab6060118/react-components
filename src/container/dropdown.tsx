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
      dropdownValue: [1],
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

  handleUpdate(value:any) {
    let newValue = [...this.state.dropdownValue]

    newValue = newValue.indexOf(value) < 0 ? [...newValue, value] : newValue.filter(v => v !== value)

    if(newValue.length === 0) return

    this.setState({
      dropdownValue: newValue
    }) 
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
        handleUpdate={this.handleUpdate.bind(this)}
        handleCloseDropdown={() => {console.log('close')}}
        id={'dropdown'}
        multiMode={true}
        valueElement={ <span style={{marginLeft: 10}}>{dropdownValue.join(',')}</span> }
        options={[
          ...dropdownItems.map( item => ({ 
            value:item.value,
            disabled: false,
            element: (
              <div style={{display: 'flex', alignItems: 'center'} as React.CSSProperties}>
              <span className="function-info-icon"></span>
              <span style={itemStyle}>{item.text}</span>
              </div> 
            )
          })),
        ]} />
    )
  }
}
