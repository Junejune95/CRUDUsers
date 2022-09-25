import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  public createForm=this._fb.group({
    firstName:new FormControl('',Validators.required),
    lastName:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
  })
  constructor(private _fb:FormBuilder) { }

  ngOnInit(): void {
  }

  onCreate(){
    console.log(this.createForm.value)
  }

  get f(){
    return this.createForm.controls;
  }

}
