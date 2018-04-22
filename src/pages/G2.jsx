import React, { Component } from 'react';

import IndexPickerView from '../components/IndexPicker';
import G2View from '../components/G2';

class View extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      currentIndex: 'uv',
      alias: null,
    };
  }
  componentWillMount() {
    // 数据来源：生意参谋-竞争-竞争店铺-关键指标趋势
    fetch('../../data/indexes.json')
    .then(response => response.json())
    .then(data => {
      this.setState({
        data
      });
    });
    fetch('../../data/alias.json')
    .then(response => response.json())
    .then(alias => {
      this.setState({
        alias
      });
    });
  }
  changeIndex = index => ()  => {
    this.setState({
      currentIndex: index
    });
  }

  render() {
    const props = {
      data: this.state.data,
      currentIndex: this.state.currentIndex,
      alias: this.state.alias
    };
    return (
      <div>
        { this.state.data && this.state.currentIndex && this.state.alias ?
          <div>
            <IndexPickerView {...props} onChange={this.changeIndex} />
            <G2View {...props} />
          </div> : null }
      </div>
    )
  }
}

export default View;