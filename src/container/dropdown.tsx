import * as React from 'react'
import Dropdown, { DropdownItemNormal } from '../components/dropdown'

const dropdownItems:{text:string, value:any}[] = [
  { text: '1', value: 1 }, { text: '2', value: 2 }, { text: '3', value: 3 },
  { text: '31', value: 31 }, { text: '32', value: 32 }, { text: '33', value: 33 },
  { text: '97', value: 97 }, { text: '98', value: 98 }, { text: '99', value: 99 },
]


interface DropdownContainerState {
  dropdownValue:any
}

const labelElement = <div><span>{'dropdown'}</span></div>

export default class DropdownContainer extends React.PureComponent<any, DropdownContainerState> {
  constructor(props:any) {
    super(props)
    this.state = {
      dropdownValue: [1],
    }

    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleCloseDropdown = this.handleCloseDropdown.bind(this)
  }

  handleUpdate(e:React.MouseEvent<HTMLElement>) {
    let value = parseInt(e.currentTarget.dataset.value)
    let newValue = [...this.state.dropdownValue]

    newValue = newValue.indexOf(value) < 0 ? [...newValue, value] : newValue.filter(v => v !== value)

    if(newValue.length === 0) return

    this.setState({
      dropdownValue: newValue
    }) 
  }

  handleCloseDropdown(){
    console.log('close');
  }

  render() {
    let { dropdownValue } = this.state
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
    let itemStyle:React.CSSProperties = {
      marginLeft: 10
    }

    return (
      <Dropdown 
        disabled={false}
        labelElement={labelElement}
        handleSelect={this.handleUpdate}
        handleCloseDropdown={this.handleCloseDropdown}
        id={'example-dropdown'}
        multiMode={true}
        valueElement={ <span style={{marginLeft: 10}}>{dropdownValue.join(',')}</span> } >
        {
          dropdownItems.map((option, index) => (
            <DropdownItemNormal value={option.value} key={index}>
              <span className="function-info-icon"></span>
              <span style={itemStyle}>{option.text}</span>
            </DropdownItemNormal>
          ))
        }
      </Dropdown>
    )
  }
}
