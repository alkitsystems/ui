import * as artistActions from './artists.actions';
import {AppAction} from '../../app.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Artist} from '../shared/artist';

export interface State {
  data: Artist[];
  selected: Artist;
  action: string;
  done: boolean;
  error?: Error;
}

const initialState: State = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null
};

export function reducer(state = initialState, action: AppAction): State {
  // ...state create immutable state object
  switch (action.type) {
      /*************************
     * GET all artists actions
     ************************/
    case artistActions.GET_ARTISTS:
      return {
        ...state,
        action: artistActions.GET_ARTISTS,
        done: false,
        selected: null,
        error: null
      };
    case artistActions.GET_ARTISTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        selected: null,
        error: null
      };
    case artistActions.GET_ARTISTS_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

      /*************************
     * GET artist by id actions
     ************************/
    case artistActions.GET_ARTIST:
      return {
        ...state,
        action: artistActions.GET_ARTIST,
        done: false,
        selected: null,
        error: null
      };
    case artistActions.GET_ARTIST_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case artistActions.GET_ARTIST_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

      /*************************
     * CREATE artist actions
     ************************/
    case artistActions.CREATE_ARTIST:
      return {
        ...state,
        selected: action.payload,
        action: artistActions.CREATE_ARTIST,
        done: false,
        error: null
      };
    case artistActions.CREATE_ARTIST_SUCCESS:
      {
        const newArtist = {
          ...state.selected,
          id: action.payload
        };
        const data = [
          ...state.data,
          newArtist
        ];
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case artistActions.CREATE_ARTIST_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

      /*************************
     * UPDATE artist actions
     ************************/
    case artistActions.UPDATE_ARTIST:
      return {
        ...state,
        selected: action.payload,
        action: artistActions.UPDATE_ARTIST,
        done: false,
        error: null
      };
    case artistActions.UPDATE_ARTIST_SUCCESS:
      {
        const index = state
          .data
          .findIndex(h => h.id === state.selected.id);
        if (index >= 0) {
          const data = [
            ...state.data.slice(0, index),
            state.selected,
            ...state.data.slice(index + 1)
          ];
          return {
            ...state,
            data,
            done: true,
            selected: null,
            error: null
          };
        }
        return state;
      }
    case artistActions.UPDATE_ARTIST_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

      /*************************
     * DELETE artist actions
     ************************/
    case artistActions.DELETE_ARTIST:
      {
        const selected = state.data.find(h => h.id === action.payload);
        return {
          ...state,
          selected,
          action: artistActions.DELETE_ARTIST,
          done: false,
          error: null
        };
      }
    case artistActions.DELETE_ARTIST_SUCCESS:
      {
        const data = state.data.filter(h => h.id !== state.selected.id);
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case artistActions.DELETE_ARTIST_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };
  }
  return state;
}

/*************************
 * SELECTORS
 ************************/
export const getArtistsState = createFeatureSelector < State > ('artists');
export const getAllArtists = createSelector(getArtistsState, (state: State) => state.data);
export const getArtist = createSelector(getArtistsState, (state: State) => {
  if (state.action === artistActions.GET_ARTIST && state.done) {
    return state.selected;
  } else {
    return null;
  }

});
export const isDeleted = createSelector(getArtistsState, (state: State) =>
  state.action === artistActions.DELETE_ARTIST && state.done && !state.error);
export const isCreated = createSelector(getArtistsState, (state: State) =>
 state.action === artistActions.CREATE_ARTIST && state.done && !state.error);
export const isUpdated = createSelector(getArtistsState, (state: State) =>
 state.action === artistActions.UPDATE_ARTIST && state.done && !state.error);

export const getDeleteError = createSelector(getArtistsState, (state: State) => {
  return state.action === artistActions.DELETE_ARTIST
    ? state.error
   : null;
});
export const getCreateError = createSelector(getArtistsState, (state: State) => {
  return state.action === artistActions.CREATE_ARTIST
    ? state.error
   : null;
});
export const getUpdateError = createSelector(getArtistsState, (state: State) => {
  return state.action === artistActions.UPDATE_ARTIST
    ? state.error
   : null;
});
export const getArtistsError = createSelector(getArtistsState, (state: State) => {
  return state.action === artistActions.GET_ARTISTS
    ? state.error
   : null;
});
export const getArtistError = createSelector(getArtistsState, (state: State) => {
  return state.action === artistActions.GET_ARTIST
    ? state.error
   : null;
});
