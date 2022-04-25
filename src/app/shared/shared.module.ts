import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsyncWrapperComponent } from './components/async-wrapper/async-wrapper.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ErrorComponent } from './components/error/error.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PreviewComponent } from './components/preview/preview.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { AgencyRangePipe } from './pipes/agency-range.pipe';
import { DeactivationDialog } from './components/deactivation/deactivation.dialog';

@NgModule({
  declarations: [
    LoadingComponent,
    ErrorComponent,
    EmptyComponent,
    RefreshComponent,
    PreviewComponent,
    AsyncWrapperComponent,
    AgencyRangePipe,
    DeactivationDialog,
  ],
  imports: [CommonModule],
  exports: [
    LoadingComponent,
    ErrorComponent,
    EmptyComponent,
    RefreshComponent,
    PreviewComponent,
    AsyncWrapperComponent,
    AgencyRangePipe,
    DeactivationDialog,
  ],
})
export class SharedModule {}
