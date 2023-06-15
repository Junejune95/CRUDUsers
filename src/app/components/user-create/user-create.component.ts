import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/users';
import { UsersService } from '../../services/users.service';
import { first, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit, OnDestroy {
  breakpoint?: number;
  breakpoint2?: number;

  titleList: Array<string> = ['mr', 'ms', 'mrs', 'miss', 'dr'];
  editUserId?: string;
  subScription?: Subscription = new Subscription();

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
    //check current screen size define form row
    this.onResize(window);
    //check userId in url param if id include in param it is edit,if not create form work
    //if edit user detail by userId and show form with user data
    if (this._activeRoute.snapshot.paramMap.get('id')) {
      this.editUserId = this._activeRoute.snapshot.paramMap.get('id')!;
      this.getUserById();
    }
  }

  getUserById() {
    this.subScription = this._userService
      .getUserDetailById(this.editUserId!)
      .pipe(first())
      .subscribe((res) => {
        //data pass in reactive form
        this.createForm.patchValue(res);
      });
  }

  onCreate() {
    console.log(this.createForm.value);
    if (!this.createForm.valid) return;

    this.subScription = this._userService
      .onCreateUser(this.createForm.value)
      .subscribe((res) => {
        //create  success go back to list page
        this.goBack();
      });
  }

  onEdit() {
    this.subScription = this._userService
      .onEditUser(this.editUserId!, this.createForm.value)
      .subscribe((res) => {
        //edit  success go back to list page
        this.goBack();
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
    //if screen size less than 768,form column show one
    if (innerWidth < 768) {
      this.breakpoint = 1;
      this.breakpoint2 = 1;
    } else {
      //if screen size greater than 768,form column show 2 or 3 depend on column
      this.breakpoint = 2;
      this.breakpoint2 = 3;
    }
    // this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 4;
  }

  ngOnDestroy() {
    if (this.subScription) this.subScription.unsubscribe();
  }
}
