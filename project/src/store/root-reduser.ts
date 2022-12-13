import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { data } from './data/data';
import { user } from './user/user';
import { utils } from './utils/utils';

export const rootReducer = combineReducers({
  [NameSpace.Data]: data.reducer,
  [NameSpace.User]: user.reducer,
  [NameSpace.Utils]: utils.reducer,
});
