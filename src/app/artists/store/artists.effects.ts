import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as artistActions from './artists.actions';
import {
  AddArtist,
  AddArtistError,
  AddArtistSuccess,
  GetAllArtistsError,
  GetAllArtistsSuccess,
  GetArtist,
  GetArtistError,
  GetArtistSuccess,
  RemoveArtist,
  RemoveArtistError,
  RemoveArtistSuccess,
  UpdateArtist,
  UpdateArtistError,
  UpdateArtistSuccess
} from './artists.actions';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {ArtistsService} from '../shared/artists.service';
import {Artist} from '../shared/artist';
import {catchError, map, switchMap} from 'rxjs/operators';

@Injectable()
export class ArtistEffects {
  constructor(private actions$: Actions,
              private svc: ArtistsService) {
  }

  getAllArtists$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
    ofType(artistActions.GET_ARTISTS),
    switchMap(() => this.svc.findAll()),
    map(heroes => new GetAllArtistsSuccess(heroes)),
    catchError((err) => [new GetAllArtistsError(err)])
  )});

  getArtist$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(artistActions.GET_ARTIST),
    map((action: GetArtist) => action.payload),
    switchMap(id => this.svc.findById(id)),
    map(hero => new GetArtistSuccess(hero)),
    catchError((err) => [new GetArtistError(err)])
  )});


  updateArtist$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(artistActions.UPDATE_ARTIST),
    map((action: UpdateArtist) => action.payload),
    switchMap(artist => this.svc.update(artist)),
    map(() => new UpdateArtistSuccess()),
    catchError((err) => [new UpdateArtistError(err)])
  )});

  createArtist$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(artistActions.CREATE_ARTIST),
    map((action: AddArtist) => action.payload),
    switchMap(newArtist => this.svc.insert(newArtist)),
    map((response) => new AddArtistSuccess(response.id)),
    catchError((err) => [new AddArtistError(err)])
  )});

  removeArtist$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(artistActions.DELETE_ARTIST),
    map((action: RemoveArtist) => action.payload),
    switchMap(id => this.svc.delete(id)),
    map((hero: Artist) => new RemoveArtistSuccess(hero)),
    catchError((err) => [new RemoveArtistError(err)])
  )});
}
