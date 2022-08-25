import { createAction, props } from '@ngrx/store';

export const SET_LOADING = '[shared state] set loading spinner';

export const setLoadingSpinner = createAction(
  SET_LOADING,
  props<{ status: boolean }>()
);
