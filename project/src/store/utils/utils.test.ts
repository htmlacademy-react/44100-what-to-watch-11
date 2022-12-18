import { DEFAULT_DISPLAYED_FILMS_COUNTER } from '../../const';
import { UtilsData } from '../../types/types';
import { newCommentAction } from '../api-actions';
import {
  increaseDispayedFilmsCounter,
  initialState,
  resetDisplayedFilmsCounter,
  setReviewFormDisabled,
  utils
} from '../utils/utils';

describe('Reducer: utils', () => {
  let state: UtilsData;

  beforeEach(() => {
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(utils.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('should set isReviewFormDisabled to true', () => {
    expect(utils.reducer(state, setReviewFormDisabled(true)))
      .toEqual({isReviewFormDisabled: true});
  });

  it('should set displayedFilmsCount to 8', () => {
    expect(utils.reducer(state, resetDisplayedFilmsCounter()))
      .toEqual({displayedFilmsCount: DEFAULT_DISPLAYED_FILMS_COUNTER});
  });

  it('should increase displayedFilmsCount by 8', () => {
    expect(utils.reducer(state, increaseDispayedFilmsCounter()))
      .toEqual({displayedFilmsCount: DEFAULT_DISPLAYED_FILMS_COUNTER + DEFAULT_DISPLAYED_FILMS_COUNTER});
  });

  it('should set isReviewFormDisabled to true while pending', () => {
    expect(utils.reducer(state, {type: newCommentAction.pending.type}))
      .toEqual({isReviewFormDisabled: true});
  });

  it('should set isReviewFormDisabled to false', () => {
    expect(utils.reducer(state, {type: newCommentAction.fulfilled.type}))
      .toEqual({isReviewFormDisabled: false});
  });

  it('should set isReviewFormDisabled to false if rejected', () => {
    expect(utils.reducer(state, {type: newCommentAction.rejected.type}))
      .toEqual({isReviewFormDisabled: false});
  });

});
