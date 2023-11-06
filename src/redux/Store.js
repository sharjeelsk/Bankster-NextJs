import logger from "redux-logger";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import userReducer from "./user/userReducer";
import socketReducer from "./socket/socketReducer";
import flagReducer from "./flags/flagReducer";
import { combineReducers } from "redux";
// import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "./loading/loadingReducer";
import { createStore, applyMiddleware } from "redux";
//import storageSession from 'redux-persist/lib/storage/session'
import storage from "redux-persist/lib/storage";
const socketPersistConfig = {
  key: "socket",
  storage: storage,
  blacklist: ["state"],
};

const RootReducer = combineReducers({
  banksterUser: persistReducer(socketPersistConfig, userReducer),
  flag: flagReducer,
  loading: loadingReducer,
  socket: persistReducer(socketPersistConfig, socketReducer),
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  blackList: ["socket"],
  // transforms: [JSOGTransform]
};
const persistedReducer = persistReducer(persistConfig, RootReducer);

const middlewares = [logger, thunk];

const store = createStore(persistedReducer, applyMiddleware(...middlewares));

export default store;
