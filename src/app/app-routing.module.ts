import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoAuxComponent } from './core/components/info-aux/info-aux.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
  {
    path: 'agencies',
    loadChildren: () => import('./agencies/agencies.module').then((m) => m.AgenciesModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: ':lesson',
    outlet: 'infoAux',
    component: InfoAuxComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
