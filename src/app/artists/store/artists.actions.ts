import {Action} from '@ngrx/store';
import {Artist} from '../shared/artist';

export const GET_ARTISTS = '[ALL] Artists';
export const GET_ARTISTS_SUCCESS = '[ALL] Artists Success';
export const GET_ARTISTS_ERROR = '[ALL] Artists Error';

export const GET_ARTIST = '[GET] Artist';
export const GET_ARTIST_SUCCESS = '[GET] Artists Success';
export const GET_ARTIST_ERROR = '[GET] Artists Error';

export const CREATE_ARTIST = '[CREATE] Artist';
export const CREATE_ARTIST_SUCCESS = '[CREATE] Artist Success';
export const CREATE_ARTIST_ERROR = '[CREATE] Artist Error';

export const DELETE_ARTIST = '[DELETE] Artist';
export const DELETE_ARTIST_SUCCESS = '[DELETE] Artist Success';
export const DELETE_ARTIST_ERROR = '[DELETE] Artist Error';

export const UPDATE_ARTIST = '[UPDATE] Artist';
export const UPDATE_ARTIST_SUCCESS = '[UPDATE] Artist Success';
export const UPDATE_ARTIST_ERROR = '[UPDATE] Artist Error';

/****************************************
 * GET all the artists
 ****************************************/
export class GetAllArtists implements Action {
  readonly type = GET_ARTISTS;
}

export class GetAllArtistsSuccess implements Action {
  readonly type = GET_ARTISTS_SUCCESS;

  constructor(public payload: Artist[]) {
  }
}

export class GetAllArtistsError implements Action {
  readonly type = GET_ARTISTS_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * GET artist by id
 ****************************************/
export class GetArtist implements Action {
  readonly type = GET_ARTIST;

  constructor(public payload: number) {
  }
}

export class GetArtistSuccess implements Action {
  readonly type = GET_ARTIST_SUCCESS;

  constructor(public payload: Artist) {
  }
}

export class GetArtistError implements Action {
  readonly type = GET_ARTIST_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new artist
 ****************************************/
export class AddArtist implements Action {
  readonly type = CREATE_ARTIST;

  constructor(public payload: Artist) {
  }
}

export class AddArtistSuccess implements Action {
  readonly type = CREATE_ARTIST_SUCCESS;

  constructor(public payload: number) {
  }
}

export class AddArtistError implements Action {
  readonly type = CREATE_ARTIST_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * REMOVE a artist by id
 ****************************************/
export class RemoveArtist implements Action {
  readonly type = DELETE_ARTIST;

  constructor(public payload: number) {
  }
}

export class RemoveArtistSuccess implements Action {
  readonly type = DELETE_ARTIST_SUCCESS;

  constructor(public payload: Artist) {
  }
}

export class RemoveArtistError implements Action {
  readonly type = DELETE_ARTIST_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * UPDATE artist by id
 ****************************************/
export class UpdateArtist implements Action {
  readonly type = UPDATE_ARTIST;

  constructor(public payload: Artist) {
  }
}

export class UpdateArtistSuccess implements Action {
  readonly type = UPDATE_ARTIST_SUCCESS;
}

export class UpdateArtistError implements Action {
  readonly type = UPDATE_ARTIST_ERROR;

  constructor(public payload: Error) {
  }
}
