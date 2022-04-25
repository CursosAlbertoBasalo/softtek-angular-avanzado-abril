import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewComponent } from './new.component';
import { NewGuard } from './new.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [NewGuard],
    component: NewComponent,
    canDeactivate: [NewGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRoutingModule {}
