import React from 'react';
import Home from './screens/home/home';
import { BrowserRouter } from 'react-router-dom';



export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
      document.getElementById('root')
    </div>
  )
}