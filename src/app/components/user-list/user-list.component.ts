import { Component, Inject, OnInit, VERSION } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UsersResult, User } from '../../interfaces/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  breakpoint?: number;
  public users = new Array<User>();
  isLoading: boolean = false;

  constructor(
    private _service: UsersService,
    private _router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getUserList();
    console.log(window.innerWidth);
    // this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;
    this.onResize(window);
  }

  getUserList() {
    this._service
      .getUsers(this.pageIndex, this.pageSize)
      .subscribe((res: UsersResult) => {
        this.users = res.data;
        this.length = res.total;
        this.isLoading = false;
      });
  }

  onResize(value: any) {
    console.log(window.innerWidth);
    const innerWidth = value.innerWidth;
    if (innerWidth > 1024) {
      this.breakpoint = 5;
    } else if (innerWidth <= 1024 && innerWidth > 912) {
      this.breakpoint = 4;
    } else if (innerWidth <= 912 && innerWidth > 768) {
      this.breakpoint = 3;
    } else if (innerWidth <= 768 && innerWidth > 412) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 1;
    }
    // this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 4;
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getUserList();
  }

  onRedirectToCreatePage() {
    this._router.navigate(['create']);
  }

  onRedirectToEditPage(id: number) {
    this._router.navigate(['edit', id]);
  }

  openDeleteDialog(user: any) {
    let dialogRef = this.dialog.open(Dialog, { data: user });
    dialogRef.afterClosed().subscribe((res) => {
      // received data from dialog-component
      console.log(res.userId);
      this.onDeleteUser(res.userId);
    });
  }

  onDeleteUser(id: string) {
    this._service.onDeleteUser(id).subscribe((res) => {
      console.log(res);
      this.getUserList();
    });
  }
}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class Dialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Dialog>
  ) {}

  onDelete() {
    this.dialogRef.close({ userId: this.data.id });
  }
}
