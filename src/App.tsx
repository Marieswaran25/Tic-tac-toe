import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Game from './components/gamebox/game';
import User from './components/user/user';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<User />}></Route>
      <Route path="/Tic-tac-toe" element={<User />}></Route>
      <Route path="/Tic-tac-toe/play" element={<Game />}></Route>

      </Routes>
    </BrowserRouter>)
  }
}

export default App;
