import {State, reducer} from './artists.reducers';
import {
    GET_ARTISTS,
    GetAllArtists,
    GetAllArtistsSuccess,
    GET_ARTISTS_ERROR,
    GetAllArtistsError,
    GetArtist,
    GET_ARTIST,
    GetArtistSuccess,
    GetArtistError,
    CREATE_ARTIST,
    CREATE_ARTIST_ERROR,
    AddArtistSuccess,
    AddArtistError,
    AddArtist,
    UPDATE_ARTIST,
    UpdateArtist,
    UpdateArtistSuccess,
    UpdateArtistError,
    DELETE_ARTIST,
    RemoveArtist,
    RemoveArtistSuccess,
    RemoveArtistError
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

let state: State = {
    data: [],
    selected: null,
    action: null,
    done: false,
    error: null
};

describe('Load all Artists REDUCER', () => {
    it('should reduce the action GET_ARTISTS', () => {
        const action = new GetAllArtists();
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            action: GET_ARTISTS,
            done: false
        });
        state = newState;
    });
    it('should reduce the action GET_ARTISTS_SUCCESS', () => {
        const payload = [...MOCK_DATA];
        const action = new GetAllArtistsSuccess(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            data: payload,
            done: true
        });
        state = newState;
    });
    it('should reduce the action GET_ARTISTS_ERROR', () => {
        const payload = new Error('Error loading all artists');
        const action = new GetAllArtistsError(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            done: true,
            error: action.payload
        });
    });
});

describe('GET Artist by id REDUCER', () => {
    it('should reduce the action GET_ARTIST', () => {
        const payload = MOCK_DATA[0].id;
        const action = new GetArtist(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            action: GET_ARTIST,
            done: false
        });
        state = newState;
    });
    it('should reduce the action GET_ARTIST_SUCCESS', () => {
        const payload = MOCK_DATA[0];
        const action = new GetArtistSuccess(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: payload,
            done: true
        });
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action GET_ARTIST_ERROR', () => {
        const payload = new Error('Error loading the artist');
        const action = new GetArtistError(payload);
        const newState = reducer(state, action);
        expect({...newState }).toEqual({
            ...state,
            done: true,
            error: action.payload
        });
    });
});

describe('Create new artist REDUCER', () => {
    it('should reduce the action CREATE_ARTIST', () => {
        const payload = {
            id: 3,
            name: 'Artist 3'
        };
        const action = new AddArtist(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: payload,
            action: CREATE_ARTIST,
            done: false
        });
        state = newState;
    });
    it('should reduce the action CREATE_ARTIST_SUCCESS', () => {
        const payload = 3;
        const action = new AddArtistSuccess(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            data: [
                ...state.data,
                {
                    ...state.selected,
                    id: payload
                }
            ],
            selected: null,
            done: true
        });
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action CREATE_ARTIST_ERROR', () => {
        const payload = new Error('Error creating the artist');
        const action = new AddArtistError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: null,
            done: true,
            error: payload
        });
    });
});

describe('Update existing artist REDUCER', () => {
    it('should reduce the action UPDATE_ARTIST', () => {
        const payload = {...MOCK_DATA[0], description: 'Descripion of Artist 1 edited'};
        const action = new UpdateArtist(payload);
        const newState = reducer(state, action);
        expect({ ...newState}).toEqual({
            ...state,
            selected: payload,
            action: UPDATE_ARTIST,
            done: false
        });
        state = newState;
    });
    it('should reduce the action UPDATE_ARTIST_SUCCESS', () => {
        const index = 0;
        const data = [
            ...state.data.slice(0, index),
            state.selected,
            ...state.data.slice(index + 1)
        ];
        const action = new UpdateArtistSuccess();
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, data, done: true, selected: null, error: null});
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action UPDATE_ARTIST_ERROR', () => {
        const payload = new Error('Error updating the artist');
        const action = new UpdateArtistError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, done: true, error: payload});
    });
});

describe('Deleting existing artist REDUCER', () => {
    it('should reduce the action DELETE_ARTIST', () => {
        const selected = MOCK_DATA[1];
        const payload = MOCK_DATA[1].id;
        const action = new RemoveArtist(payload);
        const newState = reducer(state, action);

        expect({ ...newState}).toEqual({
            ...state,
            selected,
            action: DELETE_ARTIST,
            done: false
        });
        state = newState;
    });
    it('should reduce the action DELETE_ARTIST_SUCCESS', () => {
        const payload = MOCK_DATA[1];
        const action = new RemoveArtistSuccess(payload);
        const data = state.data.filter(h => h.id !== state.selected.id);
        const newState = reducer(state, action);
        expect({...newState}).toEqual( {...state, data, selected: null, done: true});
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action DELETE_ARTIST_ERROR', () => {
        const payload = new Error('Error while deleting the artist');
        const action = new RemoveArtistError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, done: true, error: payload});
    });
});
