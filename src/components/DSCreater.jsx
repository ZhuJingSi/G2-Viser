import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import moment from 'moment';

/**
 * 装饰器
 * 用来创建 dataSet 和 dataView
 * @param {*} WrappedComponent 
 */
export const DSCreater = (WrappedComponent) =>
class extends Component {
  constructor() {
    super();
    this.state = {
      ds: null,
      dvForAll: null,
      dvForOneState: null,
    };
  }
  componentWillMount() {
    const data = this.props.data;
    const latestDate = '2018-04-20';
    // 创建 dataset 并指定状态量
    const ds = new DataSet({
      /**
       * 由于将创建数据集的逻辑抽到了装饰器中，
       * 创建好的 dataView 都通过 props 的方式向下传递
       * 而就算触发了状态量 state 的改变，也不会使 props 改变，会导致子组件无法刷新，
       * 所以放弃使用数据集内部流转的控制数据状态的方式刷新图表，
       * 而采用传统的 props 传递当前所选指标关键字
       */
      state: {
        index: 'uv',
      }
    });
    // 创建所有可选指标列的 DataView
    const dvForAll = ds.createView('shopAnalysis').source([data]);
    
    // 格式化数据
    dvForAll.transform({
      type: 'map',
      // TODO: 改成函数式
      callback: row => {
        const newData = {};
        Object.keys(row).forEach(index => {
          newData[index] = [];
          newData[index].push(...row[index].rivalAvg.map(value => {
            const array = row[index].rivalAvg;
            const dateIndex = array.length - array.indexOf(value) - 1;
            return {
              index,
              who: `竞店平均${this.props.alias[index]}`,
              date: moment(latestDate).subtract(dateIndex, 'days').format('MM-DD'),
              value,
            }
          }));
          newData[index].push(...row[index].value.map(value => {
            const array = row[index].value;
            const dateIndex = array.length - array.indexOf(value) - 1;
            return {
              index,
              who: `本店${this.props.alias[index]}`,
              date: moment(latestDate).subtract(dateIndex, 'days').format('MM-DD'),
              value,
            }
          }));
        })
        return newData;
      }
    });
    // 摘取选中指标的数据
    const dvForOneState = ds.createView('shopAnalysisOfOneState').source(dvForAll);

    this.setState({
      ds,
      dvForAll,
      dvForOneState,
    });
  }

  render() {
    const newProps = {
      ds: this.state.ds,
      dvForAll: this.state.dvForAll,
      dvForOneState: this.state.dvForOneState
    };
    return (
      <div>
        { this.state.ds && this.state.dvForAll && this.state.dvForOneState ?
          <WrappedComponent {...this.props} {...newProps} /> : null }
      </div>
    );
  }
}