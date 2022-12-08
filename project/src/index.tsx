import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { headFilm } from './mocks/headFilm';
import { filmsList } from './mocks/filmsList';
import { reviews } from './mocks/reviews';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App headFilm={headFilm} filmsList={filmsList} reviews={reviews} />
    </Provider>
  </React.StrictMode>,
);
