import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import { postReducers } from "./reducers/postReducers.js";
import { linksReducers } from "./reducers/linksReducers.js";
import storage from "redux-persist/lib/storage";

const reducer = combineReducers({
  posts: postReducers,
  links: linksReducers,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["links"],
};
const persistedReducer = persistReducer(persistConfig, reducer);
const initialState = {};
const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
let persistor = persistStore(store);
export { store, persistor };
