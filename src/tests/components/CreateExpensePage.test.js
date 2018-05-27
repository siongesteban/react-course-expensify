import React from 'react';
import { shallow } from 'enzyme';
import { CreateExpensePage } from '../../components/CreateExpensePage';
import expenses from '../fixtures/expenses';

let addExpense, history, wrapper;

beforeEach(() => {
  addExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <CreateExpensePage
      addExpense={addExpense}
      history={history}
    />
  );
});

test('should render CreateExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
  expect(addExpense).toHaveBeenLastCalledWith(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
});