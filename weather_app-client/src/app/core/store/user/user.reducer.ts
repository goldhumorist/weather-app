import * as UserActions from './user.actions';
import { createReducer, on } from '@ngrx/store';

export interface IUserState {
  email: string;
  city: string;
  isLoading: boolean;
  isNewsletter: boolean;
  error: string;
}

export const initialState: IUserState = {
  email: '',
  city: '',
  isLoading: false,
  isNewsletter: false,
  error: '',
};

export const userReducer = createReducer(
  initialState,
  //login
  on(UserActions.loginInit, (state) => ({ ...state, isLoading: true })),
  on(UserActions.loginSuccess, (state, action) => ({
    ...state,
    email: action.email,
    city: action.city,
    isNewsletter: action.isNewsletter,
    isLoading: false,
    error: '',
  })),
  on(UserActions.loginFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  // change user settings
  on(UserActions.changeUsersSettingsInit, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.changeUsersSettingsSuccess, (state, action) => ({
    ...state,
    city: action.city,
    isNewsletter: action.isNewsletter,
    isLoading: false,
    error: '',
  })),
  on(UserActions.changeUsersSettingsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  // check user auth
  on(UserActions.checkUserAuthInit, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.checkUserAuthSuccess, (state, action) => ({
    ...state,
    email: action.email,
    city: action.city,
    isNewsletter: action.isNewsletter,
    isLoading: false,
    error: '',
  })),
  on(UserActions.checkUserAuthFailure, (state, action) => ({
    ...state,
    email: '',
    city: '',
    isNewsletter: false,
    isLoading: false,
    error: action.message,
  })),
  // logout
  on(UserActions.logout, (state) => ({
    ...state,
    email: '',
    city: '',
    isNewsletter: false,
    isLoading: false,
    error: '',
  }))
);
