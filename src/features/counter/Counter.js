import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount, applyHistoryDecision,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const count = useSelector(selectCount);
  const { operations, agreementVisible } = useSelector(state => state.counter);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
      </div>
      {
        agreementVisible && (
          <dialog open>
            <p>
              Do you want to apply reloaded history?
            </p>
            <button onClick={() => dispatch(applyHistoryDecision(true))}>
              Yes
            </button>
            <button onClick={() => dispatch(applyHistoryDecision(false))}>
              No
            </button>
          </dialog>
        )
      }
      <div>
        Operations:
        {
          operations.map(({type, payload, id}) => (
            <p key={id}>
              Type: {type}<br/>
              Payload: {payload}<br/>
            </p>
          ))
        }
      </div>
    </div>
  );
}
