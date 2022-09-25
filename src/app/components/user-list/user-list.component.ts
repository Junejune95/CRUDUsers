import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { UsersResult,User } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  breakpoint?: number;
  public users=new Array<User>();

  constructor(private _service:UsersService,private _router:Router) { }

  ngOnInit(): void {
    this.getUserList()
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;
  }

  getUserList(){
    this._service.getUsers().subscribe((res:UsersResult)=>{
      console.log(res)
      this.users=res.data;
    })
  }




  
  onResize(event:any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 4;
  }

  goToRoute(){
      this._router.navigate(['create']);
  }
}
