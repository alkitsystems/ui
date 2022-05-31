import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ArtistsComponent} from './artists.component';
import {ArtistsService} from './shared/artists.service';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as artistsReducer from './store/artists.reducers';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

describe('ArtistsComponent', () => {
  let component: ArtistsComponent;
  let fixture: ComponentFixture<ArtistsComponent>;
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
        EffectsModule
      ],
      declarations: [
        ArtistsComponent
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
    fixture = TestBed.createComponent(ArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
