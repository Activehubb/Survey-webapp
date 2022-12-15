import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 public user!: User;
  public error: String;
 
  login:FormGroup|any

  constructor(route: ActivatedRoute, private _http: HttpClient, private router: Router, /* private auth: AuthService */) {
    super(route);
    this.error = "";
  }

  override ngOnInit(): void {
    this.user = new User
  }

  logindata(login: FormGroup) {
    const fetch = _.pick(this.user, ["email", "password"]);
    // console.log(fetch)
    this._http.get<any>('http://localhost:3000/signup')
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === fetch.email && a.password === fetch.password
        });
        if (!user) return alert("Incorrect email/password");
        this.router.navigate(['dashboard']);
      }, err => {
        alert('Something went wrong')
      });
}
