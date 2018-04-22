import React, { Component } from 'react';
import G2 from '@antv/g2';
import { DSCreater } from './DSCreater';

class View extends Component {
  constructor() {
    super();
    this.state = {
      chart: null,
    };
  }
  componentDidMount() {
    // 创建图表
    const chart = new G2.Chart({
      container: 'g2', // 插入节点 id
      forceFit: true, // 是否自适应容器宽度
      height : 400, // 容器高度
      padding: [ 80, 120 ] // 容器 padding
    });
    chart.source(this.props.dvForOneState.rows[0][this.props.currentIndex], {
      // 列定义
      date: {
        type: 'time', // 指定 time 类型
        mask: 'MM-DD', // 时间显示格式
        tickCount: 15 // 坐标轴上刻度点的个数
      },
      value: { // 因为是数字，所以默认判定为 linear 连续类型
        min: 0, // 定义数值范围的最小值，这里即 y 轴从 0 开始
        tickCount: 5, // 坐标轴上刻度点的个数
        formatter: value => value.toLocaleString() // 格式化 label，这里就是加上千分符
      }
    });
    // date 轴的配置
    chart.axis('date', {
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
      },
    });
    // value 轴的配置
    chart.axis('value', {
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
    });

    chart.line() // 声明几何标记类型：线图
      .position('date*value') // 坐标轴顺序，这里指定 date 为 x 轴，value 为 y 轴
      .color('who', [ '#f3d125', '#2061e7' ]) // 指标颜色
      .shape('smooth') // 形状
      .size(2); // 粗细
    // 图例配置
    chart.legend({
      position: 'top', // 位置
      marker: 'square', // 形状
    });
    // tooltip
    chart.tooltip({
      'g2-tooltip': {
        backgroundColor: '#fff',
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.13)',
        color: '#999',
        lineHeight: '12px',
        marginBottom: '10px',
      }
    });
    chart.render();
    this.setState({
      chart,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentIndex !== this.props.currentIndex) {
      // 这里一定要重新传一下 source 并 render 一下，不然图表不会重绘
      this.state.chart.source(this.props.dvForOneState.rows[0][nextProps.currentIndex])
      this.state.chart.render();
      return true;
    }
    return false;
  }

  render() {
    return <div id="g2"></div>;
  }
}

export default DSCreater(View);