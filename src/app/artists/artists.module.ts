import {NgModule} from '@angular/core';
import {artistsRoutedComponents, ArtistsRoutingModule} from './artists-routing.module';
import {SharedModule} from '../shared/shared.module';

import {StoreModule, ActionReducerMap} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ArtistEffects} from './store/artists.effects';
import * as artistReducer from './store/artists.reducers';

export const reducers: ActionReducerMap<any> = {
  artists: artistReducer.reducer
};

@NgModule({
  imports: [
    SharedModule,
    ArtistsRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ArtistEffects])
  ],
  declarations: [artistsRoutedComponents],
})
export class ArtistsModule {
}
