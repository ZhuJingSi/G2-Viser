import React, { Component } from 'react';
import G2 from '@antv/g2';
import { DataSet } from '@antv/data-set';

class View extends Component {
  componentDidMount() {
    fetch('../../data/avg-temp.json')
    .then(response => response.json())
    .then(data => {
      const ds = new DataSet();
      const dv = ds.createView().source(data);
      console.log(dv.rows[0])
      dv.transform({
        type: 'fold',
        fields: [ 'New York', 'San Francisco', 'Austin' ],
        key: 'city',
        value: 'value' 
      });
      console.log(dv.rows[0])
      const chart = new G2.Chart({
        container: 'c1',
        forceFit: true,
        height : 400,
        padding: [ 20, 120, 80, 80 ]
      });
      chart.source(dv, {
        date: {
          type: 'time',
          mask: 'YYYY.MM',
          tickCount: 12
        },
        value: {
          alias: 'Temperature, ºF'
        }
      });
      chart.axis('date', {
        line: null,
        tickLine: {
          stroke: '#000',
          length: 6 // 刻度线长度
        }
      });
      chart.axis('value', {
        tickLine: {
          stroke: '#000',
          length: 6 // 刻度线长度
        },
        label: {
          textStyle: {
            fill: '#000'
          }
        },
        line: {
          stroke: '#000'
        },
        grid: null
      });
      chart.line()
        .position('date*value')
        .color('city', [ '#1f77b4', '#ff7f0e', '#2ca02c' ])
        .shape('spline')
        .size(2);
      chart.render();
    })
  }

  render() {
    return <div id="c1"></div>;
  }
}

export default View;