import authReducer from '../../reducers/auth';

test('should set default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({});
});

test('should set uid on login', () => {
  const action = {
    type: 'LOGIN',
    uid: '123'
  };
  const state = authReducer(undefined, action);
  expect(state.uid).toBe(action.uid);
});

test('should clear uid on logout', () => {
  const state = authReducer({ uid: '123' }, { type: 'LOGOUT' });
  expect(state).toEqual({});
});