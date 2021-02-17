import {createSelector} from '@ngrx/store';
import {AppState} from './state';

const cardsState = (state: AppState) => state.cardState;

/**
 * Self explanatory selectors. Selects and slices of state.
 */
export const allCardsSelector = createSelector(cardsState, state => state.cards );
export const searchKeywordsSelector = createSelector(cardsState, state => state.keywords );
export const pagingSelector = createSelector(cardsState, state => state );
export const currentPageSizeSelector = createSelector(cardsState, state => state.pageSize );
export const totalCardsCountSelector = createSelector(cardsState, state => state.totalCount );
export const loadedCardsCountSelector = createSelector(cardsState, state => state.cards.filter(card => card.loaded).length);
export const currentPageSelector = createSelector(cardsState, state => state.currentPage );
export const isApiBusySelector = createSelector(cardsState, state => state.apiBusy);

/**
 * Check if either api is busy fetching or total count items have
 * not been loaded already. Based on this we can make a decision in
 * the components if the user is allowed to scroll further or not.
 */
export const hasMoreDataToLoad = createSelector(
  allCardsSelector,
  isApiBusySelector,
  totalCardsCountSelector,
  (cards, isApiBusy, totalCount) => {
    if (isApiBusy === false && totalCount !== cards.length) {
      return true;
    } else {
      return false;
    }
});



