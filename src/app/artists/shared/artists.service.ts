import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Artist} from './artist';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ArtistsService {
  protected URL = 'http://localhost:5000/api/artists';

  constructor(protected http: HttpClient) {
  }

  public findById(id: any): Observable<Artist> {
    return this.http.get<Artist>(this.URL + '/' + id);
  }

  public findAll(params?): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.URL, {params});
  }

  public delete(id): Observable<Artist> {
    return this.http.delete<Artist>(this.URL + '/' + id);
  }

  public insert(data: Artist): Observable<Artist> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<Artist>(this.URL, data, {headers});
  }

  public update(artist: Artist): Observable<Artist> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<Artist>(this.URL + '/' + artist.id, artist, {headers});
  }
}
