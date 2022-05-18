import { Component, OnInit } from '@angular/core';
import { ApiStatusStoreService } from '@stk/services/api-status-store.service';

@Component({
  selector: 'stk-footer',
  templateUrl: './footer.component.html',
  styles: [],
})
export class FooterComponent implements OnInit {
  status$ = this.store.get$();
  constructor(private readonly store: ApiStatusStoreService) {}

  ngOnInit(): void {}
}
