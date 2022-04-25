import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agency } from '@stk/models/agency.interface';

@Component({
  selector: 'stk-agencies',
  templateUrl: './agencies.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgenciesComponent implements OnInit {
  agencies!: { data: Agency[] };

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.agencies = {
      data: this.route.snapshot.data['agencies'],
    };
  }
}
