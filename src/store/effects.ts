import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
} from 'rxjs/operators';
import {combineLatest, of} from 'rxjs';
import {Store} from '@ngrx/store';

import {CardsDataService} from '../data/cards-data.service';
import {
  GetCardsResponseReceivedFailureAction,
  GetCardsResponseReceivedSuccessAction,
  UserSearchedByNameAction,
  UserScrolledDown,
  AppInitiatedAction
} from './actions';
import {currentPageSelector, currentPageSizeSelector, searchKeywordsSelector} from './selectors';
import {AppState} from './state';
import {GetCardsApiResponse} from '../data/get-cards-api.response';

@Injectable()
export class CardsEffects {

  /**
   * The following effect/listener will query the GET cards/ api
   * when either of the following happens:
   *  1. App initialized
   *  2. Page has changed
   *  3. Page size has changed( not required for our requirement)
   */
  $search = createEffect(() => this.actions$.pipe(
    ofType(
      AppInitiatedAction,
      UserSearchedByNameAction,
      UserScrolledDown
    ),
    switchMap(() => {
        return combineLatest(
          this.store.select(searchKeywordsSelector),
          this.store.select(currentPageSelector),
          this.store.select(currentPageSizeSelector),
        ).pipe(
          switchMap(([keywords, currentPage, currentPageSize]) =>
            this.cardsDataService.getCards(keywords, currentPage, currentPageSize)
              .pipe(
                map((cardsResponse: GetCardsApiResponse) => GetCardsResponseReceivedSuccessAction({cardsApiResponse: cardsResponse})),
                catchError(error => of(GetCardsResponseReceivedFailureAction({error}))))
          ),
        );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly cardsDataService: CardsDataService,
    private store: Store<AppState>) {}
}
