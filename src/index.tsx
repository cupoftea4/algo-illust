import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

/* TO DO:
  - style SortsTable component
  - probably cleanup somehow brenchmark worker?
  - add a button to reset the array if possible
  - do something with inline styles
  ✓ fix two same lenghts in a row not working
  ✓ probably dynamic speed change
  X add individual sort algorithms 
  X fix not working Array.prototype.isSorted() 
*/

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App />
);


