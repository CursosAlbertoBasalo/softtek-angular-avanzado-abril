import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stk-error',
  templateUrl: './error.component.html',
  styles: [],
})
export class ErrorComponent implements OnInit {
  @Input() public dataName = '';
  @Input() public error = '';
  constructor() {}

  ngOnInit(): void {}
}
