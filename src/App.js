import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter';



function App() {
  return (
    <Provider>
      <AppRouter />
    </Provider>
    
  );
}

export default App;