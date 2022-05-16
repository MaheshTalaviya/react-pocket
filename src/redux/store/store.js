import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './../reducers/index';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginData'], // which reducer want to store
  // blacklist: ['']  // which reducer do not want to store/
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);
export default store;

