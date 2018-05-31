import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addExpense,
  startAddExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import db from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'somefakeid';
const defaultAuthState = { auth: { uid } };

beforeEach((done) => {
  const expensesData = {};

  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    expensesData[id] = { description, amount, note, createdAt };
  })

  db.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup removeExpense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should remove an expense from database', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;

  store.dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      });

      return db.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test('should setup editExpense action object', () => {
  const updates = {
    description: 'React Course',
    amount: 9.99,
  };
  const action = editExpense('abc123', updates);
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'abc123',
    updates
  });
});

test('should edit expense from db', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  const updates = {
    description: 'Angular course',
    note: 'Some note'
  };

  store.dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      });

      return db.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual({
        ...snapshot.val(),
        ...updates
      });
      done();
    });
});

test('should setup addExpense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return db.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseDefault = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };

  store.dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseDefault
        }
      });

      return db.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefault);
      done();
    });
});

test('should setup set expenses action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from database', (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });

    done();
  });
});