import { Component } from '@angular/core';
import { PwaService } from './core/pwa.service';

@Component({
  selector: 'stk-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'softtek-angular-avanzado-abril';
  constructor(pwaService: PwaService) {}
}
