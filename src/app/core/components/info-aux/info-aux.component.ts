import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'stk-info-aux',
  templateUrl: './info-aux.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoAuxComponent implements OnInit {
  lesson$ = this.route.params.pipe(map((params) => params['lesson']));

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {}
}
