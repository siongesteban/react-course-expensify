import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup removeExpense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
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

test('should setup addExpense action object with provided values', () => {
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1209383,
    note: `This was last month's rent.`
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('should setup addExpense action object with default values', () => {
  const defaultExpenseData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...defaultExpenseData,
      id: expect.any(String)
    }
  });
});