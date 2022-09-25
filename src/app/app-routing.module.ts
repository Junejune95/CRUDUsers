import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from 'src/app/components/user-create/user-create.component';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';

const routes: Routes = [
{
  path:'',
  component:UserListComponent
},
{
  path:'create',
  component:UserCreateComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
