import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/users';
import { UsersService } from '../../services/users.service';
import { first } from 'rxjs';

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
    dateOfBirth: new FormControl(new Date().toISOString()),
  });

  constructor(
    private _fb: FormBuilder,
    private _userService: UsersService,
    private _router: Router,
    private _activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onResize(window);
    if (this._activeRoute.snapshot.paramMap.get('id')) {
      this.editUserId = this._activeRoute.snapshot.paramMap.get('id')!;
      this.getUserById();
    }
  }

  getUserById() {
    console.log(this.editUserId);
    this._userService.getUserDetailById(this.editUserId!).
      pipe(first()).
      subscribe((res) => {
        this.createForm.patchValue(res);
      });
  }

  onCreate() {
    console.log(this.createForm.value);
    if (!this.createForm.valid) return;

    this._userService.onCreateUser(this.createForm.value).subscribe((res) => {
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
