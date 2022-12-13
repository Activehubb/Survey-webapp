import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.services';
import { User } from 'src/app/model/user.model';
import * as _ from 'lodash';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BasePageComponent implements OnInit {

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

  // loginForm: FormGroup = new FormGroup({
  //   email: new FormGroup(null, [Validators.required]),
  //   password: new FormGroup(null, [Validators.required])
  // });

/*
  authenticate(form:NgForm): void {
    if (form.valid) {
      // Perform authentication
      this.auth.authenticate(this.user!).subscribe(data => {
        if (data.success) {
          this.auth.storeUserData(data.token, data.user);
          this.router.navigateByUrl('admin/main');
        }
      });
    } else {
      this.error = 'Form Data Invalid';
    }
  }
  */
}
