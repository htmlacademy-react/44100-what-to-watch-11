import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_DISPLAYED_FILMS_COUNTER,NameSpace } from '../../const';
import { UtilsData } from '../../types/types';
import { newCommentAction } from '../api-actions';

export const initialState: UtilsData = {
  displayedFilmsCount: DEFAULT_DISPLAYED_FILMS_COUNTER,
  isReviewFormDisabled: false,
};

export const utils = createSlice({
  name: NameSpace.Utils,
  initialState,
  reducers: {
    setReviewFormDisabled: (state, action: {type: string; payload: boolean}) => {
      state.isReviewFormDisabled = action.payload;
    },
    resetDisplayedFilmsCounter: (state) => {
      state.displayedFilmsCount = DEFAULT_DISPLAYED_FILMS_COUNTER;
    },
    increaseDispayedFilmsCounter: (state) => {
      state.displayedFilmsCount += DEFAULT_DISPLAYED_FILMS_COUNTER;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(newCommentAction.pending, (state) => {
        state.isReviewFormDisabled = true;
      })
      .addCase(newCommentAction.fulfilled, (state) => {
        state.isReviewFormDisabled = false;
      })
      .addCase(newCommentAction.rejected, (state) => {
        state.isReviewFormDisabled = false;
      });
  }
});

export const {setReviewFormDisabled, resetDisplayedFilmsCounter, increaseDispayedFilmsCounter} = utils.actions;
