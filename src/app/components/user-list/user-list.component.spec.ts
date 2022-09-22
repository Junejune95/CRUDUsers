import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj<UsersService>(['getUsers']);
    // mock user service function
    userServiceSpy.getUsers.and.callFake(function() {
      return of({
        "page": 2,
        "per_page": 6,
        "total": 12,
        "total_pages": 2,
        "data": [
          {
            id:1,
            email: 'tt@gmail.com',
            first_name:'t',
            last_name:'t',
            avatar:''
          }
        ]
      });
    });

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [UserListComponent],
      providers:[
        {
          provide:UsersService,
          userValue:userServiceSpy
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',fakeAsync(() => {
    component.ngOnInit();
    tick();

    fixture.detectChanges();
    console.log(fixture.debugElement)
    expect(component).toBeTruthy();
  }));


});
