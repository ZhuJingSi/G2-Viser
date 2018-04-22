import React, { Component } from 'react';
import { Chart, View, Line, Tooltip, Axis, Legend } from 'viser-react';
import { DSCreater } from './DSCreater';

class ViserView extends Component {
  constructor() {
    super();
    this.state = {
      chart: null,
    };
  }

  /**
   * 不同于 G2 中的连续函数调用，Viser 中对图表的描述都被抽象成了配置，
   * 然后通过 React 中给组件传 props 的方式加载配置
   */
  render() {
    /**
     * 对指定字段的配置，从 “字段: 配置” 的形成变成用 dataKey 指定字段，
     * 然后与具体配置项放在一起
     */
    const scale = [{
      dataKey: 'date', 
      type: 'time',
      mask: 'MM-DD',
      tickCount: 15
    }, {
      dataKey: 'value',
      min: 0,
      tickCount: 5,
      formatter: value => value.toLocaleString()
    }];
    /**
     * Viser 中的 Series 就是 G2 中的 Geom，
     * 在 Viser 中被具象成了多个形式的组件，在本例中即为 Line 组件
     * 原来 Geom 上的一些属性都可以作为 props 传入 Series
     * 这里的 color 需要转换成一个数组
     */
    const color = [
      'who',
      [ '#f3d125', '#2061e7' ]
    ];
    /**
     * Axis 被做成了标准组件，有多个轴的配置就需要写多个
     */
    const axis = [{
      dataKey: 'date',
      line: { // 坐标轴线
        lineWidth: 1, // 设置线的宽度
        stroke: '#eff3fa', // 设置线的颜色
        lineDash: 0 // 设置虚线样式
      },
      tickLine: null, // 刻度线
      label: { // 坐标轴文本
        textStyle: {
          fill: '#999' // 文本颜色
        }
      }
    }, {
      dataKey: 'value',
      line: null,
      tickLine: null,
      label: {
        textStyle: {
          fill: '#999'
        }
      },
      grid: { // 网格线
        lineStyle: {
          stroke: '#eff3fa',
          lineWidth: 1,
          lineDash: 0
        }
      }
    }];
    /**
     * Tooltip 同样是一个标准组件
     */
    const g2Tooltip = {
      backgroundColor: '#fff',
      boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.13)',
      color: '#999',
      lineHeight: '12px',
      marginBottom: '10px',
    };
    return (
      // Chart 容器包含组件绘制的所有步骤
      <Chart
        data={this.props.dvForOneState.rows[0][this.props.currentIndex]}
        forceFit
        height={400}
        padding={[ 80, 120 ]}
        scale={scale}>
        <Line position="date*value" color={color} shape="smooth" size={2} />
        <Tooltip g2-tooltip={g2Tooltip}/>
        {axis.map(a => <Axis {...a} key={a.dataKey} />)}
        <Legend position="top" marker="square"/>
      </Chart>
    );
  }
}

export default DSCreater(ViserView);