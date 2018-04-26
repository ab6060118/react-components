import * as React from 'react'
import Dropdown from '../components/dropdown'

interface DropdownContainerState {
  dropdownValue:any
  labelElement:JSX.Element
  options:any[]
}

export default class DropdownContainer extends React.PureComponent<any, DropdownContainerState> {
  constructor(props:any) {
    super(props)
    let itemStyle:React.CSSProperties = {
      paddingLeft: 10
    }
    let dropdownItems = [
      { text: '1', value: 1 }, { text: '2', value: 2 }, { text: '3', value: 3 },
      { text: '4', value: 4 }, { text: '5', value: 5 }, { text: '6', value: 6 },
      { text: '7', value: 7 }, { text: '8', value: 8 }, { text: '9', value: 9 },
      { text: '11', value: 11 }, { text: '12', value: 12 }, { text: '13', value: 13 },
      { text: '14', value: 14 }, { text: '15', value: 15 }, { text: '16', value: 16 },
      { text: '17', value: 17 }, { text: '18', value: 18 }, { text: '19', value: 19 },
      { text: '21', value: 21 }, { text: '22', value: 22 }, { text: '23', value: 23 },
      { text: '24', value: 24 }, { text: '25', value: 25 }, { text: '26', value: 26 },
      { text: '27', value: 27 }, { text: '28', value: 28 }, { text: '29', value: 29 },
      { text: '31', value: 31 }, { text: '32', value: 32 }, { text: '33', value: 33 },
      { text: '34', value: 34 }, { text: '35', value: 35 }, { text: '36', value: 36 },
      { text: '37', value: 37 }, { text: '38', value: 38 }, { text: '39', value: 39 },
      { text: '41', value: 41 }, { text: '42', value: 42 }, { text: '43', value: 43 },
      { text: '44', value: 44 }, { text: '45', value: 45 }, { text: '46', value: 46 },
      { text: '47', value: 47 }, { text: '48', value: 48 }, { text: '49', value: 49 },
      { text: '51', value: 51 }, { text: '52', value: 52 }, { text: '53', value: 53 },
      { text: '54', value: 54 }, { text: '55', value: 55 }, { text: '56', value: 56 },
      { text: '57', value: 57 }, { text: '58', value: 58 }, { text: '59', value: 59 },
      { text: '61', value: 61 }, { text: '62', value: 62 }, { text: '63', value: 63 },
      { text: '64', value: 64 }, { text: '65', value: 65 }, { text: '66', value: 66 },
      { text: '67', value: 67 }, { text: '68', value: 68 }, { text: '69', value: 69 },
      { text: '71', value: 71 }, { text: '72', value: 72 }, { text: '73', value: 73 },
      { text: '74', value: 74 }, { text: '75', value: 75 }, { text: '76', value: 76 },
      { text: '77', value: 77 }, { text: '78', value: 78 }, { text: '79', value: 79 },
      { text: '81', value: 81 }, { text: '82', value: 82 }, { text: '83', value: 83 },
      { text: '84', value: 84 }, { text: '85', value: 85 }, { text: '86', value: 86 },
      { text: '87', value: 87 }, { text: '88', value: 88 }, { text: '89', value: 89 },
      { text: '91', value: 91 }, { text: '92', value: 92 }, { text: '93', value: 93 },
      { text: '94', value: 94 }, { text: '95', value: 95 }, { text: '96', value: 96 },
      { text: '97', value: 97 }, { text: '98', value: 98 }, { text: '99', value: 99 },
    ]

    this.state = {
      labelElement: <div><span>{'dropdown'}</span></div>,
      dropdownValue: [1],
      options:[
        ...dropdownItems.map( (item, index) => ({ 
          value:item.value,
          disabled: false,
          element: (
            <div style={{display: 'flex', alignItems: 'center'}} key={index}>
              <span className="function-info-icon"></span>
              <span style={itemStyle}>{item.text}</span>
            </div> 
          )
        })),
      ],
    }

    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleCloseDropdown = this.handleCloseDropdown.bind(this)
  }

  handleUpdate(value:any) {
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
    let { dropdownValue, labelElement, options } = this.state
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
        labelElement={labelElement}
        handleUpdate={this.handleUpdate}
        handleCloseDropdown={this.handleCloseDropdown}
        id={'dropdown'}
        multiMode={true}
        valueElement={ <span style={{marginLeft: 10}}>{dropdownValue.join(',')}</span> }
        options={options} />
    )
  }
}
