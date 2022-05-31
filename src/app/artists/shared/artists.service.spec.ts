import {TestBed, inject, getTestBed, waitForAsync} from '@angular/core/testing';

import {ArtistsService} from './artists.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {BrowserModule} from '@angular/platform-browser';
import {Artist} from './artist';

const BASE_URL = 'http://localhost:5000/api/artists';
const MOCK_DATA: Artist[] = [
  {
    id: 1,
    name: 'Artist 1'
  }, {
    id: 2,
    name: 'Artist 2'
  }
];

describe('ArtistsService', () => {
  let injector: TestBed;
  let service: ArtistsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule, HttpClientModule, HttpClientTestingModule
      ],
      providers: [ArtistsService]
    });

    injector = getTestBed();
    service = injector.get(ArtistsService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([ArtistsService], (svc: ArtistsService) => {
    expect(svc).toBeTruthy();
  }));

  it('should get list of all artists', waitForAsync(() => {
    service
      .findAll()
      .subscribe((data: Artist[]) => {
        expect(data.length).toBe(2);
        expect(data[0]).toBe(MOCK_DATA[0]);
        expect(data[1]).toBe(MOCK_DATA[1]);
      });

    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA);
  }));

  it('should get artist by id', waitForAsync(() => {
    const id = 1;
    service
      .findById(id)
      .subscribe((response: Artist) => {
        expect(response).toBe(MOCK_DATA[0]);
      });

    const req = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA[0]);
  }));

  it('should insert new Artist', waitForAsync(() => {
    const newArtist = {
      id: 3,
      name: 'Artist 3'
    };
    service
      .insert(newArtist)
      .subscribe((successResult) => {
        expect(successResult).toBe(newArtist);
      });

    const req: TestRequest = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(newArtist);
  }));

  it('should save updates to an existing artist', waitForAsync(() => {
    const artist = {
      ...MOCK_DATA[1],
      name: 'Artist 2 changed',
    };
    const id = artist.id;
    service
      .update(artist)
      .subscribe((successResult) => {
        expect(successResult).toBe(artist);
      });

    const req: TestRequest = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(artist);
  }));

  it('should delete an existing Artist', waitForAsync(() => {
    const data = MOCK_DATA[1];
    service
      .delete(data.id)
      .subscribe((successResult) => {
        expect(successResult).toBe(data);
      }, (errorResult) => {
        throw(errorResult);
      });

    const req: TestRequest = httpMock.expectOne(`${BASE_URL}/${data.id}`);
    expect(req.request.method).toBe('DELETE');
  }));
});
