import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from './user.reducer';

export const USER_NODE = 'userReducer';

export const userState = createFeatureSelector<IUserState>(USER_NODE);

export const userStateSelector = createSelector(
  userState,
  (state: IUserState): IUserState => state
);
export const userEmailSelector = createSelector(
  userState,
  (state: IUserState): string => state.email
);
export const isLoadingSelector = createSelector(
  userState,
  (state: IUserState): boolean => state.isLoading
);
export const errorSelector = createSelector(
  userState,
  (state: IUserState): string => state.error
);
export const userCitySelector = createSelector(
  userState,
  (state: IUserState): string => state.city
);
