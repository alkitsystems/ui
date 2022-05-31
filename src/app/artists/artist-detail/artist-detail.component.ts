import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import * as artistActions from '../store/artists.actions';
import {GetArtist} from '../store/artists.actions';
import {Observable} from 'rxjs';
import {Artist} from '../shared/artist';
import {getArtist} from '../store/artists.reducers';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {
  title = 'Artist Details';
  artist: Observable<Artist>;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetArtist(+params['id']));
    });
    this.artist = this.store.select(getArtist);
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(new artistActions.RemoveArtist(id));
    }
  }

}
