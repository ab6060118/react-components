import * as React from 'react';
import { connect } from 'react-redux';
import Carouse from '../components/carousel';

class CarouselContainer extends React.PureComponent<any,any> {
  render() {
    return (
      <Carouse showDots={true}>
        <div style={{textAlign: 'center'}}>{'test1'}</div>
        <div style={{textAlign: 'center'}}>{'test2'}</div>
        <div style={{textAlign: 'center'}}>{'test3'}</div>
      </Carouse>
    )
  }
}

const mapStateToProps = (state:any, ownProps:any) => ({})

const mapDispatchToProps = (dispatch:Function) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CarouselContainer);
