import { StrictMode } from 'react';
   import { createRoot } from 'react-dom/client';
   import { Provider } from 'react-redux';
   import { store } from './store';
   import App from './App';
   import './App.css';

   createRoot(document.getElementById('root')).render(
       <StrictMode>
           <Provider store={store}>
               <App />
           </Provider>
       </StrictMode>
   );