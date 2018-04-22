import React, { Component } from 'react';
import './App.css';
import G2 from './pages/G2';
import Viser from './pages/Viser';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>G2 实现：</h2>
        <G2 />
        <h2>Viser 实现：</h2>
        <Viser />
      </div>
    );
  }
}

export default App;
