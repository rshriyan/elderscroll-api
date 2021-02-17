import {createReducer, on} from '@ngrx/store';
import {Card, CardState} from './state';
import {
  GetCardsResponseReceivedSuccessAction,
  UserSearchedByNameAction,
  UserScrolledDown,
  GetCardsResponseReceivedFailureAction, AppInitiatedAction
} from './actions';

const initialState: CardState = {
  apiBusy: false,
  cards: [],
  keywords: '',
  currentPage: 1,
  pageSize: 20,
  totalCount: 0
};

export const reducer = createReducer(initialState,
  /**
   * This action is fired when user lands on the homepage.
   * Since we need the first page to be loaded, we can set the currentPage to 1
   * which will trigger the effect to load the initial 20 items. We create
   * ghosts immediately to show progress.
   */
  on(AppInitiatedAction,  (state: CardState, action): CardState => {
    return {
      ...state,
      apiBusy: true,
      currentPage: 1,
      cards: [
        ...createGhosts(state.pageSize)
      ]
    };
  }),
  /**
   * This action is fired immediately after the component decides to forward the scroll event
   * after it checks if the api search is not in progress. We increment the page by 1, if there
   * are no items returned, the scrolling will stop or if the limit has reached.
   * Again we create ghosts immediately to show progress.
   */
  on(
    UserScrolledDown,
    (state, action): CardState => {
        return {
          ...state,
          apiBusy: true,
          currentPage: state.currentPage + 1,
          cards: [
            ...state.cards,
            ...createGhosts(state.pageSize)
          ]
        };
  }),
  /**
   * On receiving the cards from API, we do know that we have ghosts that need to removed which
   * we do by filtering. Then map the data to state.
   */
  on(GetCardsResponseReceivedSuccessAction, (state, action): CardState => {
    return {
      ...state,
      apiBusy: false,
      totalCount: action.cardsApiResponse._totalCount,
      cards: [
        ...state.cards.filter(each => each.loaded), // Filter out the ghost cards$
        ...action.cardsApiResponse.cards.map(each => ({
          imageUrl: each.imageUrl,
          name: each.name,
          text: each.text,
          setName: each.set.name,
          type: each.type,
          loading: false,
          loaded: true
        }))
      ]
    };
  }),
  /**
   * We could add functionalities like retry etc but for simplicity, we will just remove the ghosts.
   */
  on(GetCardsResponseReceivedFailureAction, (state, action): CardState => {
    return {
      ...state,
      apiBusy: false,
      cards: [
        ...state.cards.filter(each => each.loaded), // Filter out the ghost cards$
      ]
    };
  }),
  /**
   * On user search, we know that the page number needs to be reset to one. The listener will
   * do its job. Also we create ghosts again.
   */
  on(UserSearchedByNameAction,  (state: CardState, action): CardState => {
    return {
      ...state,
      apiBusy: true,
      keywords: action.keyword,
      currentPage: 1,
      cards: [
        ...createGhosts(state.pageSize)
      ]
    };
  }),
);


function createGhosts(count: number): Card[] {
  return Array.from(new Array(count), () => {
    {
      return {
        imageUrl: '',
        name: 'loading',
        text: 'loading',
        setName: 'loading',
        type: 'loading',
        loaded: false,
        loading: true
      };
    }
  });
}
