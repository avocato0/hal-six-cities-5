import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { getOffer, getComment } from './mocks/data';
import { createArrElements } from './utils/utils';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer } from './components/store/reducer';
import { createAPI } from './services/api';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ActionCreator } from './components/store/action';
import { AuthorizationStatus } from './const/const';
import { fetchPlacesList, checkAuth } from './components/store/api-actions';

// const COUNT_CARD_OFFERS = 50;
const COUNT_COMMENTS = 1;
const COUNT_CARD_OFFERS_NEARBY = 3;
// const arrOffers = createArrElements(COUNT_CARD_OFFERS, getOffer);
const arrOffersNearby = createArrElements(COUNT_CARD_OFFERS_NEARBY, getOffer);
const arrComments = createArrElements(COUNT_COMMENTS, getComment);

const api = createAPI(() =>
  store.dispatch(
    ActionCreator.requereAuthorization(AuthorizationStatus.NO_AUTH)
  )
);

// console.log(fetchPlacesList());

const store = createStore(
  reducer(),
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

Promise.all([store.dispatch(fetchPlacesList()), store.dispatch(checkAuth())])
  .then(([offers]) => {
    console.log(offers[0]);
    ReactDOM.render(
      <Provider store={store}>
        <App
          offers={offers}
          offersNearby={arrOffersNearby}
          comments={arrComments}
        />
      </Provider>,
      document.querySelector(`#root`)
    );
  })
  .catch(console.error);
