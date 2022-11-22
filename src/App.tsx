import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { ListForm } from './components/ListForm';
import './components/styles/index.scss'
import { ITodos } from './interfaces/interfaces';

function App() {
  const storage: ITodos[] = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos') as string) : [];

  return (
    <BrowserRouter>
      <div className="App">
        <h1>TODOS REACT APP</h1>
        <ListForm storage={storage}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
