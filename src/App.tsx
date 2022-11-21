import React from 'react';
import { ListForm } from './components/ListForm';
import './components/styles/index.scss'
import { ITodos } from './interfaces/interfaces';

function App() {
  const storage: ITodos[] = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos') as string) : [];

  return (
    <div className="App">
      <h1>TODOS REACT APP</h1>
      <ListForm storage={storage}/>
    </div>
  );
}

export default App;
