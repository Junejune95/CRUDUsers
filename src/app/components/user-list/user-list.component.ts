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
    this.getUserList();
    console.log(window.innerWidth)
    // this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;
    this.onResize(window)
  }

  getUserList(){
    this._service.getUsers().subscribe((res:UsersResult)=>{
      console.log(res)
     
      this.users=res.data;
    })
  }




  
  onResize(value:any) {
    console.log(window.innerWidth);
    const innerWidth=value.innerWidth;
    if(innerWidth>1024){
      this.breakpoint=5
    }else if(innerWidth<=1024 && innerWidth>912){
      this.breakpoint=4;
    }else if(innerWidth<=912 && innerWidth>768){
      this.breakpoint=3;
    }else if(innerWidth<=768 && innerWidth>412){
      this.breakpoint=2
    }else{
      this.breakpoint=1

    }
    // this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 4;
  }

  goToRoute(){
      this._router.navigate(['create']);
  }
}
