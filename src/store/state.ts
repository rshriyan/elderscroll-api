import {ActionReducer, ActionReducerMap} from '@ngrx/store';
import {MetaReducer} from '@ngrx/store/src/models';
import {reducer} from './reducer';

export interface AppState {
  cardState: CardState;
}

export interface Card {
  imageUrl: string;
  name: string;
  text: string;
  setName: string;
  type: string;
  loading: boolean;
  loaded: boolean;
}

export interface CardState
{
  apiBusy: boolean;
  cards: Card[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  keywords: string;
};

const reducerMap = {
  cardState: reducer
};

/**
 * Adds the current state and action in console for debugging.
 */
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<any>[] = [debug];
export const rootReducer: ActionReducerMap<AppState> = reducerMap;
