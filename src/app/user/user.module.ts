import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoriesPageComponent } from './repositories-page/repositories-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'repositories', component: RepositoriesPageComponent },
]
export const userRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    RepositoriesPageComponent,
  ],
  imports: [
    CommonModule,
    userRouting,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ]
})
export class UserModule { }
