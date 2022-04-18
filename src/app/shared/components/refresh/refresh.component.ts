import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'stk-refresh',
  templateUrl: './refresh.component.html',
  styles: [],
})
export class RefreshComponent implements OnInit {
  @Output() refresh = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
}
