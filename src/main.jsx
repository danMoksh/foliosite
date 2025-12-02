import { render } from 'preact';
import App from './App.jsx';
import Resume from './pages/Resume.jsx';
import './index.css';

// Simple routing
const route = window.location.pathname;

let component;
if (route === '/resume') {
  component = <Resume />;
} else {
  component = <App />;
}

render(component, document.getElementById('app'));
