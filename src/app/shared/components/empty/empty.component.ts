import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stk-empty',
  templateUrl: './empty.component.html',
  styles: [],
})
export class EmptyComponent implements OnInit {
  @Input() dataName: string = '';
  constructor() {}

  ngOnInit(): void {}
}
