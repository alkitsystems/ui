import {TestBed} from '@angular/core/testing';
import {Actions} from '@ngrx/effects';
import {ArtistEffects} from './artists.effects';
import {cold} from 'jasmine-marbles';

import {of, throwError} from 'rxjs';
import {
  AddArtistError,
  AddArtistSuccess,
  CREATE_ARTIST,
  DELETE_ARTIST,
  GET_ARTIST,
  GET_ARTISTS,
  GetAllArtistsError,
  GetAllArtistsSuccess,
  GetArtistError,
  GetArtistSuccess,
  RemoveArtistError,
  RemoveArtistSuccess,
  UPDATE_ARTIST,
  UpdateArtistError,
  UpdateArtistSuccess
} from './artists.actions';
import {Artist} from '../shared/artist';

const MOCK_DATA: Artist[] = [
  {
    id: 1,
    name: 'Artist 1'
  }, {
    id: 2,
    name: 'Artist 2'
  }
];

describe('ArtistEffects', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArtistEffects
      ]
    });
    service = jasmine.createSpyObj('svc', ['findAll', 'findById', 'update', 'insert', 'delete']);
  });

  describe('getAllArtists$', () => {
    it('should return a GET_ARTISTS_SUCCESS action, with the artists, on success', () => {
      service.findAll.and.returnValue(of(MOCK_DATA));
      const source = cold('a', {a: {type: GET_ARTISTS}});
      const effects = new ArtistEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetAllArtistsSuccess(MOCK_DATA)});

      expect(effects.getAllArtists$).toBeObservable(expected);
    });

    it('should return a GET_ARTISTS_ERROR action, with the error', () => {
      const error = new Error('Error loading artists');
      service.findAll.and.returnValue(throwError(() => error));

      const source = cold('a', {a: {type: GET_ARTISTS}});
      const effects = new ArtistEffects(new Actions(source), service);

      effects.getAllArtists$.subscribe(result => {
        expect(result).toEqual(new GetAllArtistsError(error));
      });
    });
  });

  describe('getArtist$', () => {
    it('should return a GET_ARTIST_SUCCESS action, with the artist found, on success', () => {
      const data = MOCK_DATA[0];
      service.findById.and.returnValue(of(data));
      const source = cold('a', {a: {type: GET_ARTIST}});
      const effects = new ArtistEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetArtistSuccess(data)});

      expect(effects.getArtist$).toBeObservable(expected);
    });

    it('should return a GET_ARTIST_ERROR action, with the error', () => {
      const data = MOCK_DATA[0];
      const error = new Error(`Error loading the artist with id ${data.id}`);
      service.findById.and.returnValue(throwError(() => error));

      const source = cold('a', {a: {type: GET_ARTIST}});
      const effects = new ArtistEffects(new Actions(source), service);

      effects.getArtist$.subscribe(result => {
        expect(result).toEqual(new GetArtistError(error));
      });
    });
  });

  describe('updateArtist$', () => {
    it('should return a UPDATE_ARTIST_SUCCESS action, without any data', () => {
      const data = {...MOCK_DATA[0], description: 'Description updated'};
      service.update.and.returnValue(of(data));
      const source = cold('a', {a: {type: UPDATE_ARTIST}});
      const effects = new ArtistEffects(new Actions(source), service);
      const expected = cold('a', {a: new UpdateArtistSuccess()});

      expect(effects.updateArtist$).toBeObservable(expected);
    });

    it('should return a UPDATE_ARTIST_ERROR action, with the error', () => {
      const data = {...MOCK_DATA[0], description: 'Description updated'};
      const error = new Error(`Error updating the artist with id ${data.id}`);
      service.update.and.returnValue(throwError(() => error));

      const source = cold('a', {a: {type: UPDATE_ARTIST}});
      const effects = new ArtistEffects(new Actions(source), service);

      effects.updateArtist$.subscribe(result => {
        expect(result).toEqual(new UpdateArtistError(error));
      });
    });
  });

  describe('createArtist$', () => {
    it('should return a CREATE_ARTIST_SUCCESS action, with the artist inserted, on success', () => {
      const data = {
        id: 3,
        name: 'Artist 3'
      };
      service.insert.and.returnValue(of(data));
      const source = cold('a', {a: {type: CREATE_ARTIST}});
      const effects = new ArtistEffects(new Actions(source), service);
      const expected = cold('a', {a: new AddArtistSuccess(data.id)});

      expect(effects.createArtist$).toBeObservable(expected);
    });

    it('should return a CREATE_ARTIST_ERROR action, with the error', () => {
      const data = {
        id: 3,
        name: 'Artist 3'
      };
      const error = new Error(`Error adding new artist with id ${data.id}`);
      service.insert.and.returnValue(throwError(() => error));

      const source = cold('a', {a: {type: CREATE_ARTIST}});
      const effects = new ArtistEffects(new Actions(source), service);

      effects.createArtist$.subscribe(result => {
        expect(result).toEqual(new AddArtistError(error));
      });
    });
  });

  describe('removeArtist$', () => {
    it('should return a DELETE_ARTIST_SUCCESS action, with the artist deleted, on success', () => {
      const data = MOCK_DATA[1];
      service.delete.and.returnValue(of(data));
      const source = cold('a', {a: {type: DELETE_ARTIST}});
      const effects = new ArtistEffects(new Actions(source), service);
      const expected = cold('a', {a: new RemoveArtistSuccess(data)});

      expect(effects.removeArtist$).toBeObservable(expected);
    });

    it('should return a DELETE_ARTIST_ERROR action, with the error', () => {
      const data = MOCK_DATA[1];
      const error = new Error(`Error removing the artist with id ${data.id}`);
      service.delete.and.returnValue(throwError(() => error));

      const source = cold('a', {a: {type: DELETE_ARTIST}});
      const effects = new ArtistEffects(new Actions(source), service);

      effects.removeArtist$.subscribe(result => {
        expect(result).toEqual(new RemoveArtistError(error));
      });
    });
  });
});
