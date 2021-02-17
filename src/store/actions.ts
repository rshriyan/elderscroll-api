import { createAction, props } from '@ngrx/store';
import {GetCardsApiResponse} from '../data/get-cards-api.response';

export const AppInitiatedAction = createAction(
  '[App] User initiated application.'
);

export const GetCardsResponseReceivedSuccessAction = createAction(
  '[Cards Effects] Data from get cards api has been received successfully.',
    props<{ cardsApiResponse: GetCardsApiResponse}>()
  );

export const GetCardsResponseReceivedFailureAction = createAction(
  '[Cards Effects] Data from get cards api failed to send a successful response.',
  props<{ error: unknown }>()
);

export const UserSearchedByNameAction = createAction(
  '[Search] User entered a keyword to search by name.',
  props<{ keyword: string}>()
);

export const UserScrolledDown = createAction('[Cards Container] User scrolled down for more results.');
