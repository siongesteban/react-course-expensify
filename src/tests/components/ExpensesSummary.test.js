import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

let wrapper;

beforeEach(() => {
  wrapper = shallow(
    <ExpensesSummary
      expenseCount={1}
      expensesTotal={9434}
    />
  );
});

test('should render correctly when one expense', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render correctly when multiple expenses', () => {
  wrapper.setProps({ expenseCount: 2 });
  expect(wrapper).toMatchSnapshot();
});