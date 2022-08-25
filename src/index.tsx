import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

/* TO DO:
  - add individual sort algorithms
  - fix two same lenghts in a row not working
  - add a button to reset the array if possible
  - probably dynamic speed change
  - do something with inline styles
  - fix not working Array.prototype.isSorted() 
*/

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App />
);


