import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  breakpoint?: number;
  breakpoint2?: number;

  titleList: Array<string> = ['mr', 'ms', 'mrs', 'miss', 'dr'];
  editUserId?: string;
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
    title: new FormControl(''),
    phone: new FormControl(''),
    gender: new FormControl(''),
    dateOfBirth: new FormControl(''),
  });

  constructor(
    private _fb: FormBuilder,
    private _userService: UsersService,
    private _router: Router,
    private _activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onResize(window);
    if (this._activeRoute.snapshot.paramMap.get('id')) {
      this.editUserId = this._activeRoute.snapshot.paramMap.get('id')!;
      this.getUserById();
    }
  }

  getUserById() {
    console.log(this.editUserId);
    this._userService.getUserDetailById(this.editUserId!).subscribe((res) => {
      console.log(res);
    });
  }

  onCreate() {
    console.log(this.createForm.value);
    if (!this.createForm.valid) return;
    let user: User = {
      firstName: this.createForm.value.firstName!,
      lastName: this.createForm.value.lastName!,
      email: this.createForm.value.email!,
      title: this.createForm.value.title!,
    };
    this._userService.onCreateUser(user).subscribe((res) => {
      console.log(res);
    });
  }
  get f() {
    return this.createForm.controls;
  }

  goBack() {
    this._router.navigate(['']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(value: any) {
    const innerWidth = window.innerWidth;
    if (innerWidth < 768) {
      this.breakpoint = 1;
      this.breakpoint2 = 1;
    } else {
      this.breakpoint = 2;
      this.breakpoint2 = 3;
    }
    // this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 4;
  }
}
