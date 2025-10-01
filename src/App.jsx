import React from 'react';
import Navbar from './components/common/Navbar'; 
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="mx-auto font-sans max-w-7xl">
      <Navbar/>
      <main className="min-h-screen">
        <HomePage/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;