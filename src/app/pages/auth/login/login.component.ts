import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private _auth: AuthService) {}

  ngOnInit() {}

  signup() {
    this._auth.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this._auth.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this._auth.logout();
  }
}
