import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent extends BasePageComponent implements OnInit {

  signup: FormGroup | any;
  signuser: any;
  public error: String;
  public user: User;

  constructor(route: ActivatedRoute, private router: Router, private _http:HttpClient) {
    super(route);
    this.error = "";
    this.user = new User();
  }

  override ngOnInit(): void {
  }

  signupdata(signup: FormGroup) {
    this._http.post('http://localhost:3000/signup', this.user)
      .subscribe(res => {
        alert('Something went wrong');
        this.router.navigate(['login']);
      }, err => {
        alert('Something went wrong')
      });
  }

}
