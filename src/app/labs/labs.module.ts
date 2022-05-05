import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LabsRoutingModule } from './labs-routing.module';
import { LabsComponent } from './labs.component';
import { WeightAbstractService } from './weight-abstract.service';
import { WeightImperialService } from './weight-imperial.service';

@NgModule({
  declarations: [LabsComponent],
  imports: [CommonModule, LabsRoutingModule],
  providers: [
    {
      provide: WeightAbstractService,
      useClass: WeightImperialService,
    },
  ],
})
export class LabsModule {}
