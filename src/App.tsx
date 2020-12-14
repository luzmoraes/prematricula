import React from 'react';

import AppProvider from  './context/App'
import Routes from './routes'

import './styles/global.css'

const App = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
