import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ArtistDetailComponent} from './artist-detail.component';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {ArtistsService} from '../shared/artists.service';
import {EffectsModule} from '@ngrx/effects';
import {ActionReducerMap, Store} from '@ngrx/store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import * as artistsReducer from '../store/artists.reducers';

export const reducers: ActionReducerMap<any> = {
  artists: artistsReducer.reducer
};

describe('ArtistDetailComponent', () => {
  let component: ArtistDetailComponent;
  let fixture: ComponentFixture<ArtistDetailComponent>;
  let mockStore: MockStore<{ artists: artistsReducer.State }>;
  const initialState = {
    artists: {
      data: [],
      selected: {
        id: 1,
        name: 'Artist 1',
      },
      action: 'GET_ARTIST',
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
        EffectsModule.forRoot([])
      ],
      declarations: [
        ArtistDetailComponent,
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
    fixture = TestBed.createComponent(ArtistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'Artist Details'`, () => {
    expect(component.title).toEqual('Artist Details');
  });
});
