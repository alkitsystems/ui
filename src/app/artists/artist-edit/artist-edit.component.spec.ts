import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ArtistEditComponent} from './artist-edit.component';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ArtistsService} from '../shared/artists.service';
import * as artistsReducer from '../store/artists.reducers';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

describe('ArtistEditComponent', () => {
  let component: ArtistEditComponent;
  let fixture: ComponentFixture<ArtistEditComponent>;
  let mockStore: MockStore<{ artists: artistsReducer.State }>;
  const initialState = {
    artists: {
      data: [],
      selected: {
        id: 1,
        name: 'Artist 1'
      },
      action: 'UPDATE_ARTIST',
      done: true
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot([]),
        EffectsModule
      ],
      declarations: [
        ArtistEditComponent
      ],
      providers: [
        ArtistsService,
        {provide: APP_BASE_HREF, useValue: '/'},
        provideMockStore({initialState})
      ]
    })
      .compileComponents();

    mockStore = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'Artist'`, () => {
    expect(component.title).toEqual('Artist');
  });

});
