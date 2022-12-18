import { AuthStatus } from '../../const';
import { GlobalUserData } from '../../types/types';
import { checkAuthStatusAction, loginAction, logoutAction } from '../api-actions';
import { initialState, user } from '../user/user';

describe('Reducer: user', () => {

  let state: GlobalUserData;

  beforeEach(() => {
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(user.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('should set authorizationStatus to Auth if checkAuthStatusAction fulfilled', () => {
    expect(user.reducer(state, { type: checkAuthStatusAction.fulfilled.type }))
      .toEqual({authorizationStatus: AuthStatus.Auth});
  });

  it('should set authorizationStatus to NoAuth if checkAuthStatusAction rejected', () => {
    expect(user.reducer(state, { type: checkAuthStatusAction.rejected.type }))
      .toEqual({authorizationStatus: AuthStatus.NoAuth});
  });

  it('should set authorizationStatus to Auth if loginAction fulfilled', () => {
    expect(user.reducer(state, { type: loginAction.fulfilled.type }))
      .toEqual({authorizationStatus: AuthStatus.Auth});
  });

  it('should set authorizationStatus to NoAuth if loginAction rejected', () => {
    expect(user.reducer(state, { type: loginAction.rejected.type }))
      .toEqual({authorizationStatus: AuthStatus.NoAuth});
  });

  it('should set authorizationStatus to NoAuth if logoutAction fulfilled', () => {
    expect(user.reducer(state, { type: logoutAction.fulfilled.type }))
      .toEqual({authorizationStatus: AuthStatus.NoAuth});
  });

});
