
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get the root element
const rootElement = document.getElementById("root");

// Ensure root element exists
if (!rootElement) {
  throw new Error("Root element not found");
}

// Create root and render App
const root = createRoot(rootElement);
root.render(<App />);
