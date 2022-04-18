import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stk-loading',
  templateUrl: './loading.component.html',
  styles: [],
})
export class LoadingComponent implements OnInit {
  @Input() public dataName = '';
  constructor() {}

  ngOnInit(): void {}
}
