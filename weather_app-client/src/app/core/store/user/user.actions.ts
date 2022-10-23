import { createAction, props } from '@ngrx/store';
import {
  IUserLoginData,
  IUserData,
  IUserSettingData,
} from 'src/app/shared/interfaces';
import { USER_NODE } from './user.selectors';

// Login actions
export const loginInit = createAction(
  `[${USER_NODE}] login Init`,
  props<IUserLoginData>()
);
export const loginSuccess = createAction(
  `[${USER_NODE}] login success`,
  props<IUserData>()
);
export const loginFailure = createAction(
  `[${USER_NODE}] login failure`,
  props<{ error: string }>()
);

// User settings actions
export const changeUsersSettingsInit = createAction(
  `[${USER_NODE}] change settings init`,
  props<IUserSettingData>()
);
export const changeUsersSettingsSuccess = createAction(
  `[${USER_NODE}] change settings success`,
  props<IUserSettingData>()
);
export const changeUsersSettingsFailure = createAction(
  `[${USER_NODE}] change settings failure`,
  props<{ error: string }>()
);

// User check auth actions
export const checkUserAuthInit = createAction(
  `[${USER_NODE}] check user auth init`
);
export const checkUserAuthSuccess = createAction(
  `[${USER_NODE}] check user auth success`,
  props<IUserData>()
);
export const checkUserAuthFailure = createAction(
  `[${USER_NODE}] check user auth failure`,
  props<{ message: string }>()
);

// User logout
export const logout = createAction(`[${USER_NODE}] user logout`);
