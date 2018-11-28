import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AlbumsComponent } from './albums/albums.component';
import { PhotosComponent } from './photos/photos.component';
import { ChartsComponent } from './charts/charts.component';
const routes: Routes = [
  {
    path:"",
    component: UsersComponent
  },
  {
    path:"albums",
    component: AlbumsComponent
  },
  {
    path:"photos/:id",
    component: PhotosComponent
  },
  {
    path:"charts",
    component: ChartsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
