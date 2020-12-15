import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from 'redux-saga'
import {onCounterChangedSaga} from "./onCounterChangedSaga";

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: [
    sagaMiddleware,
  ]
});

sagaMiddleware.run(onCounterChangedSaga)

