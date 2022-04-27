import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'stk-login',
  templateUrl: './login.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    console.log('Simulated Login');
    this.navigateBack();
  }
  private navigateBack() {
    const homeUrl = '/';
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.router.navigateByUrl(returnUrl || homeUrl);
  }
}
