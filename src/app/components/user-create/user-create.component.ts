import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  public createForm = this._fb.group({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private _fb: FormBuilder, private _userService: UsersService,private _router:Router) {}

  ngOnInit(): void {}

  onCreate() {
    console.log(this.createForm);
    if (!this.createForm.valid) return;
    let user: User = {
      firstName: this.createForm.value.firstName!,
      lastName: this.createForm.value.lastName!,
      email: this.createForm.value.email!,
    };
    this._userService.onCreateUser(user).subscribe((res) => {
      console.log(res);
    });
  }
  get f() {
    return this.createForm.controls;
  }

  goBack(){
    this._router.navigate([''])
  }
}
