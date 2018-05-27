import { createStore } from 'redux';

const increment = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrement = ({ decrementBy = 1} = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const set = ({ count }) => ({
  type: 'SET',
  count
});

const reset = () => ({
  type: 'RESET'
});

// Reducers

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'SET':
      return {
        count: action.count || state.count
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(increment());
store.dispatch(increment({ incrementBy: 7 }));
store.dispatch(reset());
store.dispatch(decrement());
store.dispatch(decrement({ decrementBy: 10 }));
store.dispatch(set({ count: 500 }));