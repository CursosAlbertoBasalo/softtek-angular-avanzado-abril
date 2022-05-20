import { Component, OnInit } from '@angular/core';
import { ApiStatusStoreService } from '@stk/services/api-status-store.service';
import { PwaStore } from '../../pwa.store';

@Component({
  selector: 'stk-footer',
  templateUrl: './footer.component.html',
  styles: [],
})
export class FooterComponent implements OnInit {
  status$ = this.store.get$();
  pwa$ = this.pwaStore.get$();
  constructor(private readonly store: ApiStatusStoreService, private pwaStore: PwaStore) {}

  ngOnInit(): void {}

  reloadApp() {
    document.location.reload();
  }
}
