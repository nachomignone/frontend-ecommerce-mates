import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';  

import './styles/tailwind.css'; // Import Tailwind CSS
import App from './App.jsx'

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    {/* Envolvemos App con BrowserRouter */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
