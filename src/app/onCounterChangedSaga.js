import { takeEvery, call, put, take, delay } from "@redux-saga/core/effects";
import {
  applyHistoryDecision,
  decrement,
  increment,
  incrementByAmount,
  setOperations,
  showAgreement
} from "../features/counter/counterSlice";

const actions = [];

const addActionRequest = (action) => new Promise((resolve, reject) => {
  actions.push({
    ...action,
    id: Date.now(),
  });
  // Need to copy array because usage as resolve parameter makes it not extensible
  resolve([...actions])
})

function* onCounterChanged (action) {
  const response = yield call(addActionRequest, action);
  yield put(showAgreement());
  const { payload: decision } = yield take(applyHistoryDecision.toString());
  if (decision) {
    yield delay(3000);
    yield put(setOperations(response));
  }
}

export function* onCounterChangedSaga() {
  yield takeEvery([
    increment.toString(),
    decrement.toString(),
    incrementByAmount.toString(),
  ], onCounterChanged)
}
