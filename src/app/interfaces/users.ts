export interface UsersResult {
  data: User[];
  limit: number;
  page: number;
  total: number;
}

export interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  picture?: string;
  title?: string;
}
