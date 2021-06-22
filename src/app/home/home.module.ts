import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: HomePageComponent},
]
export const homeRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    HomePageComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    homeRouting,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class HomeModule { }
