import React, { Component } from 'react';
import { DSCreater } from './DSCreater';
import './IndexPicker.css';

class View extends Component {
  constructor() {
    super();
    this.state = {
      indexes: {}
    };
  }
  componentWillMount() {
    this.setState({
      indexes: this.props.data,
    });
  }

  render() {
    return (
      <div className="index-picker">
        { Object.keys(this.state.indexes).map(indexName => {
            const rival = this.state.indexes[indexName].rivalAvg;
            const value = this.state.indexes[indexName].value;
            const data = {
              rival: rival[rival.length - 1].toLocaleString(),
              value: value[value.length - 1].toLocaleString()
            }
            return (
              <div className={`index-picker-index ${this.props.currentIndex === indexName ? "active" : null}`}
                key={indexName}
                onClick={this.props.onChange(indexName)}>
                <strong className="title">{this.props.alias[indexName]}</strong>
                <div className="data">本店：<span className="value">{data.value}</span></div>
                <div className="data">竞店平均：<span className="value">{data.rival}</span></div>
              </div>
            )
          }) }
      </div>
    );
  }
}

export default DSCreater(View);