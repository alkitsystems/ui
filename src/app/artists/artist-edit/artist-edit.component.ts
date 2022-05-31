import {Component, OnInit} from '@angular/core';
import {Artist} from '../shared/artist';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import * as artistActions from '../store/artists.actions';
import {GetArtist, UpdateArtist} from '../store/artists.actions';
import {getArtist} from '../store/artists.reducers';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.scss']
})
export class ArtistEditComponent implements OnInit {
  title = 'Artist';
  artist: Artist;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetArtist(+params['id']));
    });
    this.store.select(getArtist).subscribe(artist => {
      if (artist != null) {
        this.artist = {...artist};
      }
    });
  }

  onSaveArtist(frmArtist: NgForm) {
    this.artist.name = frmArtist.controls['txtName'].value;
    this.store.dispatch(new UpdateArtist(this.artist));
  }

  onBack() {
    this.router.navigate(['/artists']);
  }

  reset() {
    this.artist.name = '';
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(new artistActions.RemoveArtist(id));
    }
  }

}
