import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {AppState} from '../app.state';
import {GetAllArtists} from './store/artists.actions';
import {
  getCreateError, getDeleteError, getArtistsError, getUpdateError, isCreated, isDeleted,
  isUpdated
} from './store/artists.reducers';

@Component({
  selector: 'app-artists',
  template: `
    <router-outlet></router-outlet>`,
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  constructor(private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new GetAllArtists());

    // subscriptions when success or error action
    this.store.select(getArtistsError).subscribe((error) => this.loadingError(error));
    this.store.select(isDeleted).subscribe((done) => {
      this.actionSuccess(done, 'The artist was deleted successfully!!!');
    });
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error while deleting the artist');
    });
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done, 'The artist was updated successfully!!!');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the artist');
    });
    this.store.select(isCreated).subscribe((done) => {
      this.actionSuccess(done, 'The artist was created successfully!!!');
    });
    this.store.select(getCreateError).subscribe((error) => {
      this.actionError(error, 'Error while creating the artist');
    });
  }

  loadingError(error) {
    if (error) {
      alert('Error while loading the list of artists');
    }
  }

  actionSuccess(done: boolean, message: string) {
    if (done) {
      alert(message);
      this.router.navigate(['/artists']);
    }
  }

  actionError(error, message: string) {
    if (error) {
      alert(message);
    }
  }
}
