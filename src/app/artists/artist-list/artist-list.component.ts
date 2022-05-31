import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Artist } from '../shared/artist';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import * as artistActions from '../store/artists.actions';
import { getAllArtists } from '../store/artists.reducers';

import { IUser } from '../../auth/models';
import { UserService } from '../../auth/services';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  title = 'List of Artists';
  artists: Observable<Artist[]>;

  users: IUser[] = [];

  constructor(private userService: UserService,
    private store: Store<AppState>) {
  }

  ngOnInit() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;

    });
    this.artists = this.store.select(getAllArtists);
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(new artistActions.RemoveArtist(id));
    }
  }
}
