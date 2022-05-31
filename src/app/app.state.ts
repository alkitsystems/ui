import * as fromArtists from './artists/store/artists.reducers';

export interface AppState {
  artists: fromArtists.State;
}
