import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

import {ArtistsComponent} from './artists.component';
import {ArtistListComponent} from './artist-list/artist-list.component';
import {ArtistCreateComponent} from './artist-create/artist-create.component';
import {ArtistDetailComponent} from './artist-detail/artist-detail.component';
import {ArtistEditComponent} from './artist-edit/artist-edit.component';

export const artistsRoutes: Routes = [{
  path: '',
  component: ArtistsComponent,
  children: [
    {path: '', component: ArtistListComponent},
    {path: 'detail/:id', component: ArtistDetailComponent},
    {path: 'create', component: ArtistCreateComponent},
    {path: 'edit/:id', component: ArtistEditComponent}
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(artistsRoutes)
  ],
  exports: [RouterModule]
})
export class ArtistsRoutingModule {
}

export const artistsRoutedComponents = [
  ArtistsComponent,
  ArtistListComponent,
  ArtistDetailComponent,
  ArtistCreateComponent,
  ArtistEditComponent
];
