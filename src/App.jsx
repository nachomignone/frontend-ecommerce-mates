import React from 'react';
import Navbar from './components/common/Navbar'; 
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <main>
        <HomePage/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;