import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getDisplayedFilmsCount = (state: State) => state[NameSpace.Utils].displayedFilmsCount;

export const getFormStatus = (state: State) => state[NameSpace.Utils].isReviewFormDisabled;
