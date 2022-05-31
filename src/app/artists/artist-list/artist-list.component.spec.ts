import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ArtistListComponent} from './artist-list.component';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Store, StoreModule} from '@ngrx/store';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {ArtistsService} from '../shared/artists.service';
import * as artistsReducer from '../store/artists.reducers';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

describe('ArtistListComponent', () => {
  let component: ArtistListComponent;
  let fixture: ComponentFixture<ArtistListComponent>;
  let mockStore: MockStore<{ artists: artistsReducer.State }>;
  const initialState = {
    artists: {
      data: [
        {
          id: 1,
          name: 'Artist 1'
        }, {
          id: 2,
          name: 'Artist 2'
        }
      ],
      selected: null,
      action: 'GET_ARTISTS',
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
        ArtistListComponent,
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
    fixture = TestBed.createComponent(ArtistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'List of Artists'`, () => {
    expect(component.title).toEqual('List of Artists');
  });
});
