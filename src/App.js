import React, { Component } from 'react';
import './App.css';
import G2 from './pages/G2';
import Viser from './pages/Viser';
import Bezier from './pages/Bezier';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>G2 实现：</h2>
        <G2 />
        <h2>Viser 实现：</h2>
        <Viser />
        <h2>Bezier 曲线：</h2>
        <Bezier />
      </div>
    );
  }
}

export default App;
