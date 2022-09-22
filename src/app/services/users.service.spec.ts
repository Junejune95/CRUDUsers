import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_URL } from 'src/app/interfaces/constants';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock!: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a user result', () => {
    service.getUsers().subscribe(resut => {
      expect(resut).toBeTruthy();
      expect(resut.data).toBeTruthy();
      expect(resut.data.length).toEqual(1);
      console.log('Result Verify');
    })

    const req=httpMock.expectOne(API_URL+'users');
    expect(req.request.method).toBe('GET');
    req.flush({
      data:[{
        email:'zune@gmail.com',
        first_name:'Zune',
        avator:'https',
        id:1
      }]
    })
  });


});
