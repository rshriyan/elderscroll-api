import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subject, Subscription} from 'rxjs';
import {filter, first, switchMap} from 'rxjs/operators';

import {UserSearchedByNameAction, UserScrolledDown, AppInitiatedAction} from '../store/actions';
import {AppState, Card} from '../store/state';
import {allCardsSelector, hasMoreDataToLoad, loadedCardsCountSelector, totalCardsCountSelector} from '../store/selectors';

/**
 * App component in this case will be the smart component.
 * Subscribing to data, setting up behaviors etc and passing it on to the child components.
 * This is where all of our app decisions will happen.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'highspot-elderscroll';
  allCards$: Observable<Card[]> = new Observable<Card[]>(); /** Includes ghost cards **/
  loadedCardsCount$: Observable<number> = new Observable<number>(); /** Only cards that have data loaded **/
  totalCardsCount$: Observable<number> = new Observable<number>();
  scroll$: Subject<void> = new Subject<void>();
  scrollSubscription$!: Subscription;

  onSearch(keyword: string): void {
    this.store.dispatch(UserSearchedByNameAction({ keyword }));
  }

  onScroll() {
    this.scroll$.next();
  }

  ngOnInit(): void {

    /** Handle to slices of state, wrapped as observables **/
    this.allCards$ = this.store.select(allCardsSelector);
    this.loadedCardsCount$ = this.store.select(loadedCardsCountSelector);
    this.totalCardsCount$ = this.store.select(totalCardsCountSelector);

    /** Initiate app and load the initial set of cards */
    this.store.dispatch(AppInitiatedAction());

    /**
     * Listen to scroll and buffer its emission until the api search is completed.
     * Also do not register a scroll if all the items for the query have been loaded.
     * This also passes on the emission if previously the user scrolled, so the scroll event
     * is never lost. This will stop unnecessary scroll events to fire if there is no more
     * data to load.
     */
    this.scrollSubscription$ = this.scroll$.pipe(
      switchMap(() => this.store.select(hasMoreDataToLoad)
          .pipe(
              filter(value => value), /** If true, then user can scroll further */
              first(), /** Close the inner observable */
          )),
    ).subscribe(() => {
      this.store.dispatch(UserScrolledDown());
    });
  }

  ngOnDestroy(): void {
    /**
     * Clean up manual Rx subscriptions
     */
    this.scrollSubscription$.unsubscribe();
  }

  constructor(private readonly store: Store<AppState>) {}
}
