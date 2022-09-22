export interface UsersResult {
    data : User[],
    page:number,
    per_page:number,
    total:number,
    total_pages:number
  }
  

  export interface User {
    id:number,
    email?: string,
    first_name:string,
    last_name:string,
    avatar:string
  }