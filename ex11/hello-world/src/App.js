import React from 'react';
import './App.css';
import HelloCGU from './cgu_hello';
import MultiButton from './cgu_multiButton';

function App() {
  return (
    <div className="App">
      <div>
        <HelloCGU />
      </div>
      <div>
        <MultiButton />
      </div>
    </div>
  );
}

export default App;
