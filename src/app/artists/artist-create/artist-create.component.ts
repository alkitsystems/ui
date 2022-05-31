import {Component, OnInit} from '@angular/core';
import {Artist} from '../shared/artist';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {AddArtist} from '../store/artists.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-artist-create',
  templateUrl: './artist-create.component.html',
  styleUrls: ['./artist-create.component.scss']
})
export class ArtistCreateComponent implements OnInit {
  title = 'Create Artist';
  artist: Artist = new Artist();

  constructor(private router: Router,
              private store: Store<AppState>) {

  }

  ngOnInit() {

  }

  onBack() {
    this.router.navigate(['/artists']);
  }

  onSaveArtist() {
    this.store.dispatch(new AddArtist(this.artist));
  }

  reset() {
    this.artist.name = '';
  }
}
