import React, { Component } from 'react';

class View extends Component {
  componentDidMount() {
    const yList = this.mockData();
    this.drawLine(yList);
    this.drawPoint(yList);
  }
  /**
   * mock 数据（y 轴坐标）
   */
  mockData() {
    const data = [40];
    for (var i = 1; i < 15; i++) {
      data.push(Math.round(Math.random() * 10) * 25 + 30);
    };
    return data;
  }
  /**
   * @param {*} yList y 轴坐标点集合
   * @param {*} curIndex 当前点位置
   * @return 当前点的 x、y 坐标
   */
  getPoint = yList => index => {
    const divideX = Math.ceil(document.body.clientWidth / (yList.length + 1));
    return {
      x: index * divideX + 10,
      y: 400 - yList[index],
    };
  }
  /**
   * Ai (Xi + a * (Xi+1 - Xi-1), Yi + a * (Yi+1 - Yi-1))
   * Bi (Xi+1 - b * (Xi+2 - Xi), Yi+1 - b * (Yi+2 - Yi))
   * a,b 为可任意给定的正数
   * @return 获取控制点 A、B、下一个节点坐标
   */
  getCPoints = (scale1 = 0.25, scale2 = 0.25) => yList  => curIndex => {
    const point = this.getPoint(yList);
    let p0 = point(curIndex - 1);
    let p1 = point(curIndex);
    let p2 = point(curIndex + 1);
    let p3 = point(curIndex + 2);

    if (curIndex === 0) {
      p0 = p1; // (x-1, y-1) = (x0, y0)
    } else if (curIndex === yList.length - 2) {
      p3 = p2; // (xn+1, yn+1) = (xn, yn)
    };

    return {
      cAx: p1.x + scale1 * (p2.x - p0.x), // 第一个控制点 X 坐标
      cAy: p1.y + scale1 * (p2.y - p0.y), // 第一个控制点 Y 坐标
      cBx: p2.x - scale2 * (p3.x - p1.x), // 第二个控制点 X 坐标
      cBy: p2.y - scale2 * (p3.y - p1.y), // 第二个控制点 Y 坐标
      nextX: p2.x, // 下一个点 X 坐标
      nextY: p2.y, // 下一个点 Y 坐标
    };
  }
  /**
   * 画曲线
   * @param {*} yList 
   */
  drawLine(yList) {
    const node = document.getElementById('bezier');
    const cxt = node.getContext('2d');
    cxt.lineWidth = 2;
    cxt.strokeStyle='#2a65e8';
    yList.forEach((res, index) => {
      if (index === 0) { // 起点移到第一个坐标点
        const point = this.getPoint(yList);
        cxt.moveTo(point(index).x, point(index).y);
      }
      if (index !== yList.length -1) {
        const p = this.getCPoints()(yList)(index);
        cxt.bezierCurveTo(p.cAx, p.cAy, p.cBx, p.cBy, p.nextX, p.nextY);
      }
    });
    cxt.stroke();
  }
  /**
   * 画点
   * @param {*} yList 
   */
  drawPoint(yList) {
    yList.forEach((res, index) => {
      const point = this.getPoint(yList);
      const node = document.getElementById('bezier');
      const cxt = node.getContext('2d');
      cxt.fillStyle = '#2a65e8';
      cxt.beginPath();
      cxt.arc(point(index).x, point(index).y, 3, 0, Math.PI * 2, true);
      cxt.closePath();
      cxt.fill();
    });
  }

  render() {
    return (
    <canvas
      id="bezier"
      width={document.body.clientWidth - 40}
      height="400"
      style={{ padding: '10px 20px' }}>
    </canvas>
    )
  }
}

export default View;