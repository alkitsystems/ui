import {
    GetAllArtists,
    GET_ARTISTS,
    GET_ARTISTS_SUCCESS,
    GetAllArtistsSuccess,
    GetAllArtistsError,
    GET_ARTISTS_ERROR,
    GetArtist,
    GET_ARTIST,
    GetArtistSuccess,
    GET_ARTIST_SUCCESS,
    GetArtistError,
    GET_ARTIST_ERROR,
    AddArtist,
    CREATE_ARTIST,
    AddArtistSuccess,
    CREATE_ARTIST_SUCCESS,
    CREATE_ARTIST_ERROR,
    AddArtistError,
    RemoveArtist,
    DELETE_ARTIST,
    RemoveArtistSuccess,
    DELETE_ARTIST_SUCCESS,
    DELETE_ARTIST_ERROR,
    RemoveArtistError,
    UpdateArtist,
    UPDATE_ARTIST,
    UpdateArtistSuccess,
    UPDATE_ARTIST_ERROR,
    UpdateArtistError,
    UPDATE_ARTIST_SUCCESS
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
/****************************************
 * GET all the artists
 ****************************************/
describe('Load All Artists ACTION', () => {
    it('should create the action GET_ARTISTS', () => {
        const action = new GetAllArtists();
        expect({...action}).toEqual({type: GET_ARTISTS});
    });
    it('should create the action GET_ARTISTS_SUCCESS', () => {
        const payload = [...MOCK_DATA];
        const action = new GetAllArtistsSuccess(payload);
        expect({...action}).toEqual({type: GET_ARTISTS_SUCCESS, payload});
    });
    it('should create the action GET_ARTISTS_ERROR', () => {
        const payload = new Error('Error loading all artists');
        const action = new GetAllArtistsError(payload);
        expect({...action}).toEqual({
            type: GET_ARTISTS_ERROR, payload
        });
    });
});
/****************************************
 * GET artist by id
 ****************************************/
describe('Load specific Artist ACTION', () => {
    it('should create the action GET_ARTIST', () => {
        const payload = MOCK_DATA[0].id;
        const action = new GetArtist(payload);
        expect({...action}).toEqual({ type: GET_ARTIST, payload });
    });
    it('should create the action GET_ARTIST_SUCCESS', () => {
        const payload = MOCK_DATA[0];
        const action = new GetArtistSuccess(payload);
        expect({...action}).toEqual({ type: GET_ARTIST_SUCCESS, payload });
    });
    it('should create the action GET_ARTIST_ERROR', () => {
        const payload = new Error('Error loading the artist');
        const action = new GetArtistError(payload);
        expect({...action}).toEqual({
            type: GET_ARTIST_ERROR, payload
        });
    });
});

/****************************************
 * ADD new artist
 ****************************************/
describe('Create new Artist ACTION', () => {
    it('should create the action CREATE_ARTIST', () => {
        const payload = MOCK_DATA[1];
        const action = new AddArtist(payload);
        expect({...action}).toEqual({
            type: CREATE_ARTIST, payload
        });
    });
    it('should create the action CREATE_ARTIST_SUCCESS', () => {
        const payload = MOCK_DATA[1].id;
        const action = new AddArtistSuccess(payload);
        expect({...action}).toEqual({ type: CREATE_ARTIST_SUCCESS, payload });
    });
    it('should create the action CREATE_ARTIST_ERROR', () => {
        const payload = new Error('Error while adding a new artist');
        const action = new AddArtistError(payload);
        expect({...action}).toEqual({ type: CREATE_ARTIST_ERROR, payload });
    });
});
/****************************************
 * REMOVE a artist by id
 ****************************************/
describe('Remove a Artist ACTION', () => {
    it('should create the action DELETE_ARTIST', () => {
        const payload = MOCK_DATA[1].id;
        const action = new RemoveArtist(payload);
        expect({...action}).toEqual({ type: DELETE_ARTIST, payload });
    });
    it('should create the action DELETE_ARTIST_SUCCESS', () => {
        const payload = MOCK_DATA[1];
        const action = new RemoveArtistSuccess(payload);
        expect({...action}).toEqual({ type: DELETE_ARTIST_SUCCESS, payload });
    });
    it('should create the action DELETE_ARTIST_ERROR', () => {
        const payload = new Error('Error removing artist.');
        const action = new RemoveArtistError(payload);
        expect({...action}).toEqual({ type: DELETE_ARTIST_ERROR, payload });
    });
});
/****************************************
 * UPDATE artist by id
 ****************************************/
describe('Update a Artist ACTION', () => {
    it('should create the action UPDATE_ARTIST', () => {
        const payload = MOCK_DATA[0];
        const action = new UpdateArtist(payload);
        expect({...action}).toEqual({ type: UPDATE_ARTIST, payload });
    });
    it('should create the action UPDATE_ARTIST_SUCCESS', () => {
        const action = new UpdateArtistSuccess();
        expect({...action}).toEqual({type: UPDATE_ARTIST_SUCCESS});
    });
    it('should create the action UPDATE_ARTIST_ERROR', () => {
        const payload = new Error('Error updating artist.');
        const action = new UpdateArtistError(payload);
        expect({...action}).toEqual({
            type: UPDATE_ARTIST_ERROR, payload
        });
    });
});
