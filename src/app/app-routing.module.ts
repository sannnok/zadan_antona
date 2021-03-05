import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AntonComponent } from './anton/anton.component';
import { PeredComponent } from './pered/pered.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'zad',
        component: AntonComponent,
        data: { animation: 'zad' },
      },
      {
        path: 'pered',
        component: PeredComponent,
        data: { animation: 'pered' },
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
