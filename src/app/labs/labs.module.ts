import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LabsRoutingModule } from './labs-routing.module';
import { LabsComponent } from './labs.component';
import { WeightAbstractService } from './weight-abstract.service';
import { WeightImperialService } from './weight-imperial.service';
import { WeightMetricService } from './weight-metric.service';

@NgModule({
  declarations: [LabsComponent],
  imports: [CommonModule, LabsRoutingModule],
  providers: [
    // {
    //   provide: WeightAbstractService,
    //   useClass: WeightImperialService,
    // },
    // {
    //   provide: WeightAbstractService,
    //   useValue: {
    //     getWeight: (peso: number) => {
    //       return peso * 6 + ' arrobas ';
    //     },
    //   },
    // },
    {
      provide: WeightAbstractService,
      useFactory: () => {
        if (environment.units === 'imperial') return new WeightImperialService();
        else return new WeightMetricService();
      },
    },
  ],
})
export class LabsModule {}
