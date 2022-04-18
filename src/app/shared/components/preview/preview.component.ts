import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stk-preview',
  templateUrl: './preview.component.html',
  styles: [],
})
export class PreviewComponent implements OnInit {
  @Input() data: unknown;
  constructor() {}

  ngOnInit(): void {}
}
