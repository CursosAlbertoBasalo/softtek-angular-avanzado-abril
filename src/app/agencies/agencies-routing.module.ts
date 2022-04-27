import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '../core/authenticated.guard';
import { AgenciesComponent } from './agencies.component';
import { AgenciesResolver } from './agencies.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      agencies: AgenciesResolver,
    },
    component: AgenciesComponent,
    children: [
      {
        path: ':id',
        loadChildren: () => import('./trips/trips.module').then((m) => m.TripsModule),
      },
    ],
  },
  {
    path: 'new',
    canLoad: [AuthenticatedGuard],
    loadChildren: () => import('./new/new.module').then((m) => m.NewModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenciesRoutingModule {}
