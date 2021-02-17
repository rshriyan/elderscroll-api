import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { CardComponent } from './card/card.component';
import {CardsDataService} from '../data/cards-data.service';
import {HttpClientModule} from '@angular/common/http';
import {metaReducers, rootReducer} from '../store/state';
import {CardsEffects} from '../store/effects';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { GhostComponent } from './ghost/ghost.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    CardComponent,
    GhostComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    InfiniteScrollModule,
    NgxSkeletonLoaderModule.forRoot(),
    AppRoutingModule,
    EffectsModule.forRoot([CardsEffects]),
    StoreModule.forRoot(rootReducer, { metaReducers }),
  ],
  providers: [CardsDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
